import express from "express";
import auth from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { USER_ROLE } from "../User/user.utils";
import { VoteController } from "./vote.controller";
import { voteValidationSchema } from "./vote.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.MEMBER, USER_ROLE.ADMIN),
  validateRequest(voteValidationSchema),
  VoteController.voteIdea
);

router.delete(
  "/:ideaId",
  auth(USER_ROLE.MEMBER, USER_ROLE.ADMIN),
  VoteController.removeVote
);

export const VoteRoutes = router;