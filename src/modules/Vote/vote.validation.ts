import { z } from "zod";

export const voteValidationSchema = z.object({
  body: z.object({
    ideaId: z.string().min(1, "Idea id is required"),
    type: z.enum(["UP", "DOWN"]),
  }),
});

export const VoteValidations = {
  voteValidationSchema,
};