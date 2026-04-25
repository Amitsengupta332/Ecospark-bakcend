import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.utils";
import { validateRequest } from "../../middlewares/validateRequest";
import { PaymentValidations } from "./payment.validation";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post(
  "/create-payment-intent",
  auth(USER_ROLE.MEMBER, USER_ROLE.ADMIN),
  validateRequest(PaymentValidations.createPaymentIntentValidationSchema),
  PaymentController.createPaymentIntent
);

router.post(
  "/confirm",
  auth(USER_ROLE.MEMBER, USER_ROLE.ADMIN),
  validateRequest(PaymentValidations.confirmPaymentValidationSchema),
  PaymentController.confirmPayment
);

router.get(
  "/my-purchases",
  auth(USER_ROLE.MEMBER, USER_ROLE.ADMIN),
  PaymentController.getMyPurchases
);

export const PaymentRoutes = router;