import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { UserRoutes } from "../modules/User/user.route";

import { PaymentRoutes } from "../modules/Payment/payment.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { IdeaRoutes } from "../modules/Idea/idea.route";
import { VoteRoutes } from "../modules/Vote/vote.route";
import { DashboardRoutes } from "../modules/Dashboard/dashboard.route";

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/ideas",
    route: IdeaRoutes,
  },
  {
    path: "/votes",
    route: VoteRoutes,
  },
  {
    path: "/payments",
    route: PaymentRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

// https://libraries.io/npm/@bayajidalam%2Fapollo-cli
