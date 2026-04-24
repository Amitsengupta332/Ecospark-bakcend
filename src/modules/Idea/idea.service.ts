import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";

export type TIdeaPayload = {
  title: string;
  slug: string;
  problemStatement: string;
  proposedSolution: string;
  description: string;
  thumbnail?: string;
  images?: string[];
  isPaid?: boolean;
  price?: number;
  categoryId: string;
  status?: "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
};

const ideaSelect = {
  id: true,
  title: true,
  slug: true,
  problemStatement: true,
  proposedSolution: true,
  description: true,
  thumbnail: true,
  images: true,
  status: true,
  isPaid: true,
  price: true,
  submittedAt: true,
  approvedAt: true,
  rejectedAt: true,
  createdAt: true,
  updatedAt: true,
  authorId: true,
  categoryId: true,
  author: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
};

const createIdea = async (userId: string, payload: TIdeaPayload) => {
  const isSlugExists = await prisma.idea.findUnique({
    where: { slug: payload.slug },
  });

  if (isSlugExists) {
    throw new AppError(httpStatus.CONFLICT, "Idea slug already exists");
  }

  const categoryExists = await prisma.category.findUnique({
    where: { id: payload.categoryId },
  });

  if (!categoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  if (payload.isPaid && (!payload.price || payload.price <= 0)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Paid idea must have valid price");
  }

  const result = await prisma.idea.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      problemStatement: payload.problemStatement,
      proposedSolution: payload.proposedSolution,
      description: payload.description,
      thumbnail: payload.thumbnail,
      images: payload.images || [],
      isPaid: payload.isPaid || false,
      price: payload.isPaid ? payload.price || 0 : 0,
      authorId: userId,
      categoryId: payload.categoryId,
      status: "DRAFT",
    },
    select: ideaSelect,
  });

  return result;
};

const getAllIdeas = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = query.searchTerm as string | undefined;
  const sortBy = (query.sortBy as string) || "createdAt";
  const sortOrder = (query.sortOrder as "asc" | "desc") || "desc";
  const categoryId = query.categoryId as string | undefined;
  const status = query.status as string | undefined;
  const isPaid =
    query.isPaid !== undefined ? query.isPaid === "true" : undefined;

  const andConditions: Prisma.IdeaWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
        { problemStatement: { contains: searchTerm, mode: "insensitive" } },
      ],
    });
  }

  if (categoryId) andConditions.push({ categoryId });
  if (status) andConditions.push({ status: status as any });
  if (typeof isPaid === "boolean") andConditions.push({ isPaid });

  const whereClause: Prisma.IdeaWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const [data, total] = await Promise.all([
    prisma.idea.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: ideaSelect,
    }),
    prisma.idea.count({ where: whereClause }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data,
  };
};

const getSingleIdea = async (id: string) => {
  const result = await prisma.idea.findUnique({
    where: { id },
    select: ideaSelect,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Idea not found");
  }

  return result;
};

const updateIdea = async (
  userId: string,
  userRole: string,
  id: string,
  payload: Partial<TIdeaPayload>
) => {
  const isIdeaExists = await prisma.idea.findUnique({
    where: { id },
  });

  if (!isIdeaExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Idea not found");
  }

  if (userRole !== "ADMIN" && isIdeaExists.authorId !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not allowed");
  }

  if (
    userRole !== "ADMIN" &&
    ["UNDER_REVIEW", "APPROVED"].includes(isIdeaExists.status)
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can only edit draft or rejected idea"
    );
  }

  if (payload.slug && payload.slug !== isIdeaExists.slug) {
    const slugExists = await prisma.idea.findUnique({
      where: { slug: payload.slug },
    });

    if (slugExists) {
      throw new AppError(httpStatus.CONFLICT, "Idea slug already exists");
    }
  }

  if (payload.categoryId) {
    const categoryExists = await prisma.category.findUnique({
      where: { id: payload.categoryId },
    });

    if (!categoryExists) {
      throw new AppError(httpStatus.NOT_FOUND, "Category not found");
    }
  }

  if (payload.isPaid && (!payload.price || payload.price <= 0)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Paid idea must have valid price");
  }

  const result = await prisma.idea.update({
    where: { id },
    data: {
      ...payload,
      price: payload.isPaid === false ? 0 : payload.price,
    },
    select: ideaSelect,
  });

  return result;
};

const deleteIdea = async (userId: string, userRole: string, id: string) => {
  const isIdeaExists = await prisma.idea.findUnique({
    where: { id },
  });

  if (!isIdeaExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Idea not found");
  }

  if (userRole !== "ADMIN" && isIdeaExists.authorId !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not allowed");
  }

  if (
    userRole !== "ADMIN" &&
    ["UNDER_REVIEW", "APPROVED"].includes(isIdeaExists.status)
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can only delete draft or rejected idea"
    );
  }

  await prisma.idea.delete({
    where: { id },
  });

  return null;
};

const submitIdea = async (userId: string, id: string) => {
  const isIdeaExists = await prisma.idea.findUnique({
    where: { id },
  });

  if (!isIdeaExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Idea not found");
  }

  if (isIdeaExists.authorId !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not allowed");
  }

  if (!["DRAFT", "REJECTED"].includes(isIdeaExists.status)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Idea cannot be submitted");
  }

  const result = await prisma.idea.update({
    where: { id },
    data: {
      status: "UNDER_REVIEW",
      submittedAt: new Date(),
    },
    select: ideaSelect,
  });

  return result;
};

const approveIdea = async (id: string, adminId: string) => {
  const isIdeaExists = await prisma.idea.findUnique({
    where: { id },
  });

  if (!isIdeaExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Idea not found");
  }

  const result = await prisma.idea.update({
    where: { id },
    data: {
      status: "APPROVED",
      approvedAt: new Date(),
      reviews: {
        create: {
          adminId,
          action: "APPROVED",
          message: "Idea approved",
        },
      },
    },
    select: ideaSelect,
  });

  return result;
};

const rejectIdea = async (id: string, adminId: string, message: string) => {
  const isIdeaExists = await prisma.idea.findUnique({
    where: { id },
  });

  if (!isIdeaExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Idea not found");
  }

  const result = await prisma.idea.update({
    where: { id },
    data: {
      status: "REJECTED",
      rejectedAt: new Date(),
      reviews: {
        create: {
          adminId,
          action: "REJECTED",
          message,
        },
      },
    },
    select: ideaSelect,
  });

  return result;
};

export const IdeaService = {
  createIdea,
  getAllIdeas,
  getSingleIdea,
  updateIdea,
  deleteIdea,
  submitIdea,
  approveIdea,
  rejectIdea,
};