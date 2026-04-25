import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.utils";
import { DashboardController } from "./dashboard.controller";

const router = express.Router();

router.get(
  "/member",
  auth(USER_ROLE.MEMBER),
  DashboardController.getMemberDashboard
);

router.get(
  "/admin",
  auth(USER_ROLE.ADMIN),
  DashboardController.getAdminDashboard
);

export const DashboardRoutes = router;