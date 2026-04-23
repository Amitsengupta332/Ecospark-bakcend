// import { z } from "zod";

// export const createUserValidationSchema = z.object({
//   body: z.object({
//     name: z.string().min(1, "Name is required"),
//     email: z.string().email("Invalid email"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     role: z.enum(["ADMIN", "MEMBER"]).optional(),
//   }),
// });

// export const updateUserValidationSchema = z.object({
//   body: z.object({
//     name: z.string().min(1).optional(),
//     email: z.string().email().optional(),
//     password: z.string().min(6).optional(),
//     role: z.enum(["ADMIN", "MEMBER"]).optional(),
//     status: z.enum(["ACTIVE", "BLOCKED"]).optional(),
//   }),
// });

// user.validation.ts
import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    avatar: z.string().optional(),
    role: z.enum(["ADMIN", "MEMBER"]).optional(),
    status: z.enum(["ACTIVE", "BLOCKED"]).optional(),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    avatar: z.string().optional(),
    role: z.enum(["ADMIN", "MEMBER"]).optional(),
    status: z.enum(["ACTIVE", "BLOCKED"]).optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};