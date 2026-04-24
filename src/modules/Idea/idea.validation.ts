import { z } from "zod";

export const createIdeaValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    problemStatement: z.string().min(1, "Problem statement is required"),
    proposedSolution: z.string().min(1, "Proposed solution is required"),
    description: z.string().min(1, "Description is required"),
    thumbnail: z.string().optional(),
    images: z.array(z.string()).optional(),
    isPaid: z.boolean().optional(),
    price: z.number().optional(),
    categoryId: z.string().min(1, "Category is required"),
  }),
});

export const updateIdeaValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    problemStatement: z.string().min(1).optional(),
    proposedSolution: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    thumbnail: z.string().optional(),
    images: z.array(z.string()).optional(),
    isPaid: z.boolean().optional(),
    price: z.number().optional(),
    categoryId: z.string().optional(),
    status: z.enum(["DRAFT", "UNDER_REVIEW", "APPROVED", "REJECTED"]).optional(),
  }),
});

export const IdeaValidations = {
  createIdeaValidationSchema,
  updateIdeaValidationSchema,
};