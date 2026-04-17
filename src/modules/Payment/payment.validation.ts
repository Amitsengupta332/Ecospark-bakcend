import { z } from "zod";

const createPaymentIntentValidationSchema = z.object({
  body: z.object({
    participationId: z.string().min(1, "Participation id is required"),
  }),
});

const confirmPaymentValidationSchema = z.object({
  body: z.object({
    participationId: z.string().min(1, "Participation id is required"),
    transactionId: z.string().min(1, "Transaction id is required"),
  }),
});

export const PaymentValidations = {
  createPaymentIntentValidationSchema,
  confirmPaymentValidationSchema,
};