import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.utils";

const router = express.Router();
router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  validateRequest(createUserValidationSchema),
  UserController.createUser,
);

router.get("/", auth(USER_ROLE.ADMIN), UserController.getAllUsers);

router.get(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserController.findUserById,
);

router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(updateUserValidationSchema),
  UserController.updateUserById,
);

router.delete("/:id", auth(USER_ROLE.ADMIN), UserController.deleteUserById);
export const UserRoutes = router;
