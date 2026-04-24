import express from "express";
import auth from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { USER_ROLE } from "../User/user.utils";
import { IdeaController } from "./idea.controller";
import {
  createIdeaValidationSchema,
  updateIdeaValidationSchema,
} from "./idea.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.MEMBER, USER_ROLE.ADMIN),
  validateRequest(createIdeaValidationSchema),
  IdeaController.createIdea
);

router.get("/", IdeaController.getAllIdeas);
router.get("/:id", IdeaController.getSingleIdea);

router.patch(
  "/:id",
  auth(USER_ROLE.MEMBER, USER_ROLE.ADMIN),
  validateRequest(updateIdeaValidationSchema),
  IdeaController.updateIdea
);

router.delete(
  "/:id",
  auth(USER_ROLE.MEMBER, USER_ROLE.ADMIN),
  IdeaController.deleteIdea
);

router.patch(
  "/submit/:id",
  auth(USER_ROLE.MEMBER, USER_ROLE.ADMIN),
  IdeaController.submitIdea
);

router.patch(
  "/approve/:id",
  auth(USER_ROLE.ADMIN),
  IdeaController.approveIdea
);

router.patch(
  "/reject/:id",
  auth(USER_ROLE.ADMIN),
  IdeaController.rejectIdea
);

export const IdeaRoutes = router;