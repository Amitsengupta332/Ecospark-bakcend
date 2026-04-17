import Stripe from "stripe";
import config from "../../config";
import { TIPaymentResult, TPaymentConfirmation, TPaymentIntent } from "./payment.interface";
import { prisma } from "../../lib/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: "2023-10-16" as any,
});

const createPaymentIntent = async (
  payload: TPaymentIntent
): Promise<TIPaymentResult> => {
  const { participationId } = payload;

  const participation = await prisma.participation.findUnique({
    where: { id: participationId },
    include: {
      event: true,
      payment: true,
      user: true,
    },
  });

  if (!participation) {
    throw new AppError(httpStatus.NOT_FOUND, "Participation not found");
  }

  if (participation.event.feeType !== "PAID") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This event does not require payment"
    );
  }

  if (!participation.event.fee || participation.event.fee <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Invalid event fee"
    );
  }

  if (participation.payment && participation.payment.status === "success") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This participation is already paid"
    );
  }

  const amount = participation.event.fee;
  const amountInCents = Math.round(amount * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    metadata: {
      participationId: participation.id,
      userId: participation.userId,
      eventId: participation.eventId,
    },
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "always",
    },
  });

  return {
    clientSecret: paymentIntent.client_secret as string,
    amount,
    transactionId: paymentIntent.id,
  };
};

const savePaymentRecord = async (payload: TPaymentConfirmation) => {
  const result = await prisma.$transaction(async (tx) => {
    const existingPayment = await tx.payment.findUnique({
      where: {
        participationId: payload.participationId,
      },
    });

    if (existingPayment) {
      return await tx.payment.update({
        where: {
          participationId: payload.participationId,
        },
        data: {
          transactionId: payload.transactionId,
          amount: payload.amount,
          status: payload.status,
        },
      });
    }

    const payment = await tx.payment.create({
      data: {
        participationId: payload.participationId,
        transactionId: payload.transactionId,
        amount: payload.amount,
        status: payload.status,
      },
    });

    return payment;
  });

  return result;
};

const confirmPayment = async (
  participationId: string,
  transactionId: string
) => {
  const participation = await prisma.participation.findUnique({
    where: { id: participationId },
    include: {
      event: true,
      payment: true,
    },
  });

  if (!participation) {
    throw new AppError(httpStatus.NOT_FOUND, "Participation not found");
  }

  let paymentIntent = await stripe.paymentIntents.retrieve(transactionId);

  if (paymentIntent.status === "requires_payment_method") {
    paymentIntent = await stripe.paymentIntents.confirm(transactionId, {
      payment_method: "pm_card_visa",
    });
  }

  if (paymentIntent.status === "succeeded") {
    const amount = paymentIntent.amount / 100;

    const existingPayment = await prisma.payment.findFirst({
      where: { transactionId },
    });

    if (existingPayment) {
      return existingPayment;
    }

    return await savePaymentRecord({
      participationId,
      transactionId,
      amount,
      status: "success",
      gatewayData: paymentIntent as unknown as Record<string, any>,
    });
  } else {
    await savePaymentRecord({
      participationId,
      transactionId,
      amount: participation.event.fee || 0,
      status: "failed",
      gatewayData: paymentIntent as unknown as Record<string, any>,
    });

    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Payment status is ${paymentIntent.status}`
    );
  }
};

export const PaymentService = {
  createPaymentIntent,
  confirmPayment,
};