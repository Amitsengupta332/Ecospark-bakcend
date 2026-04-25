import Stripe from "stripe";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: "2023-10-16" as any,
});

const createPaymentIntent = async (userId: string, ideaId: string) => {
  const idea = await prisma.idea.findUnique({
    where: { id: ideaId },
  });

  if (!idea) {
    throw new AppError(httpStatus.NOT_FOUND, "Idea not found");
  }

  if (idea.status !== "APPROVED") {
    throw new AppError(httpStatus.BAD_REQUEST, "Idea is not approved");
  }

  if (!idea.isPaid || idea.price <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "This idea is free");
  }

  if (idea.authorId === userId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Author cannot purchase own idea");
  }

  const existingPurchase = await prisma.purchase.findUnique({
    where: {
      userId_ideaId: {
        userId,
        ideaId,
      },
    },
  });

  if (existingPurchase?.paymentStatus === "PAID") {
    throw new AppError(httpStatus.BAD_REQUEST, "Idea already purchased");
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(idea.price * 100),
    currency: "usd",
    metadata: {
      userId,
      ideaId,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  await prisma.purchase.upsert({
    where: {
      userId_ideaId: {
        userId,
        ideaId,
      },
    },
    update: {
      amount: idea.price,
      paymentStatus: "PENDING",
      transactionId: paymentIntent.id,
      provider: "stripe",
    },
    create: {
      userId,
      ideaId,
      amount: idea.price,
      paymentStatus: "PENDING",
      transactionId: paymentIntent.id,
      provider: "stripe",
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    amount: idea.price,
    transactionId: paymentIntent.id,
  };
};

const confirmPayment = async (
  userId: string,
  ideaId: string,
  transactionId: string
) => {
  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_ideaId: {
        userId,
        ideaId,
      },
    },
  });

  if (!purchase) {
    throw new AppError(httpStatus.NOT_FOUND, "Purchase not found");
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(transactionId);

  if (paymentIntent.status !== "succeeded") {
    await prisma.purchase.update({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
      data: {
        paymentStatus: "FAILED",
      },
    });

    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Payment status is ${paymentIntent.status}`
    );
  }

  const result = await prisma.purchase.update({
    where: {
      userId_ideaId: {
        userId,
        ideaId,
      },
    },
    data: {
      paymentStatus: "PAID",
      transactionId,
      paidAt: new Date(),
    },
    include: {
      idea: true,
    },
  });

  return result;
};

const getMyPurchases = async (userId: string) => {
  return await prisma.purchase.findMany({
    where: {
      userId,
      paymentStatus: "PAID",
    },
    include: {
      idea: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const PaymentService = {
  createPaymentIntent,
  confirmPayment,
  getMyPurchases,
};