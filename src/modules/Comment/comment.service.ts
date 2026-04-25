import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

export type TCommentPayload = {
  content: string;
  ideaId: string;
  parentId?: string;
};

const commentSelect = {
  id: true,
  content: true,
  ideaId: true,
  userId: true,
  parentId: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
    },
  },
  replies: {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  },
};

const createComment = async (userId: string, payload: TCommentPayload) => {
  const idea = await prisma.idea.findUnique({
    where: { id: payload.ideaId },
  });

  if (!idea) {
    throw new AppError(httpStatus.NOT_FOUND, "Idea not found");
  }

  if (idea.status !== "APPROVED") {
    throw new AppError(httpStatus.BAD_REQUEST, "You can comment only approved ideas");
  }

  if (payload.parentId) {
    const parentComment = await prisma.comment.findUnique({
      where: { id: payload.parentId },
    });

    if (!parentComment) {
      throw new AppError(httpStatus.NOT_FOUND, "Parent comment not found");
    }

    if (parentComment.ideaId !== payload.ideaId) {
      throw new AppError(httpStatus.BAD_REQUEST, "Parent comment does not belong to this idea");
    }
  }

  return await prisma.comment.create({
    data: {
      content: payload.content,
      ideaId: payload.ideaId,
      userId,
      parentId: payload.parentId,
    },
    select: commentSelect,
  });
};

const getIdeaComments = async (ideaId: string) => {
  const idea = await prisma.idea.findUnique({
    where: { id: ideaId },
  });

  if (!idea) {
    throw new AppError(httpStatus.NOT_FOUND, "Idea not found");
  }

  return await prisma.comment.findMany({
    where: {
      ideaId,
      parentId: null,
    },
    orderBy: { createdAt: "desc" },
    select: commentSelect,
  });
};

const deleteComment = async (
  userId: string,
  userRole: string,
  commentId: string
) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
  }

  if (userRole !== "ADMIN" && comment.userId !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not allowed");
  }

  await prisma.comment.delete({
    where: { id: commentId },
  });

  return null;
};

export const CommentService = {
  createComment,
  getIdeaComments,
  deleteComment,
};