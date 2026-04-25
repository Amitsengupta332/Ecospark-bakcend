import { z } from "zod";

export const createCommentValidationSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Comment is required"),
    ideaId: z.string().min(1, "Idea id is required"),
    parentId: z.string().optional(),
  }),
});

export const CommentValidations = {
  createCommentValidationSchema,
};