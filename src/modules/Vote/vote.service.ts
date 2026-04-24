import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

export type TVotePayload = {
  ideaId: string;
  type: "UP" | "DOWN";
};

const voteIdea = async (userId: string, payload: TVotePayload) => {
  const idea = await prisma.idea.findUnique({
    where: { id: payload.ideaId },
  });

  if (!idea) {
    throw new AppError(httpStatus.NOT_FOUND, "Idea not found");
  }

  if (idea.status !== "APPROVED") {
    throw new AppError(httpStatus.BAD_REQUEST, "You can vote only approved ideas");
  }

  const existingVote = await prisma.vote.findUnique({
    where: {
      userId_ideaId: {
        userId,
        ideaId: payload.ideaId,
      },
    },
  });

  if (existingVote) {
    if (existingVote.type === payload.type) {
      throw new AppError(httpStatus.BAD_REQUEST, "You already voted this idea");
    }

    return await prisma.vote.update({
      where: { id: existingVote.id },
      data: { type: payload.type },
    });
  }

  return await prisma.vote.create({
    data: {
      userId,
      ideaId: payload.ideaId,
      type: payload.type,
    },
  });
};

const removeVote = async (userId: string, ideaId: string) => {
  const existingVote = await prisma.vote.findUnique({
    where: {
      userId_ideaId: {
        userId,
        ideaId,
      },
    },
  });

  if (!existingVote) {
    throw new AppError(httpStatus.NOT_FOUND, "Vote not found");
  }

  await prisma.vote.delete({
    where: { id: existingVote.id },
  });

  return null;
};

export const VoteService = {
  voteIdea,
  removeVote,
};