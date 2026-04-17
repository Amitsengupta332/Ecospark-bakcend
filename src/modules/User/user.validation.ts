// import { z } from "zod";

// export const createUserValidationSchema = z.object({
//   body: z.object({
//     name: z.string(),
//     email: z.string().email(),
//     password: z.string(),
//     role: z.enum(["admin", "user"]).optional(),
//     img: z.string().optional(),
//     rating: z.number().optional(),
//     rents: z.array(z.string()).optional(),
//   }),
// });

// export const updateUserValidationSchema = z.object({
//   body: z.object({
//     name: z.string().optional(),
//     email: z.string().email().optional(),
//     password: z.string().optional(),
//     role: z.enum(["admin", "user"]).optional(),
//     img: z.string().optional(),
//     rating: z.number().optional(),
//     rents: z.array(z.string()).optional(),
//   }),
// });

// export const UserValidations = {
//   createUserValidationSchema,
//   updateUserValidationSchema,
// };


import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["ADMIN", "USER"]).optional(),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["ADMIN", "USER"]).optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};