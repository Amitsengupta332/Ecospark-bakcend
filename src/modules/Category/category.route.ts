import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.utils";
import { CategoryController } from "./category.controller";
import {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
} from "./category.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  validateRequest(createCategoryValidationSchema),
  CategoryController.createCategory
);

router.get("/", CategoryController.getAllCategories);

router.get("/:id", CategoryController.getSingleCategory);

router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(updateCategoryValidationSchema),
  CategoryController.updateCategory
);

router.delete("/:id", auth(USER_ROLE.ADMIN), CategoryController.deleteCategory);

export const CategoryRoutes = router;