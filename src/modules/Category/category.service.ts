import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

export type TCategoryPayload = {
  name: string;
  slug: string;
  description?: string;
};

const categorySelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  createdAt: true,
  updatedAt: true,
};

const createCategory = async (payload: TCategoryPayload) => {
  const isExists = await prisma.category.findFirst({
    where: {
      OR: [{ name: payload.name }, { slug: payload.slug }],
    },
  });

  if (isExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Category name or slug already exists",
    );
  }

  const result = await prisma.category.create({
    data: payload,
    select: categorySelect,
  });

  return result;
};

// const getAllCategories = async () => {
//   return await prisma.category.findMany({
//     orderBy: { createdAt: "desc" },
//     select: categorySelect,
//   });
// };

const getAllCategories = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const [result, total] = await Promise.all([
    prisma.category.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: categorySelect,
    }),
    prisma.category.count(),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: { id },
    select: categorySelect,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  return result;
};

const updateCategory = async (
  id: string,
  payload: Partial<TCategoryPayload>,
) => {
  const isExists = await prisma.category.findUnique({
    where: { id },
  });

  if (!isExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  if (payload.name || payload.slug) {
    const duplicate = await prisma.category.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          {
            OR: [
              payload.name ? { name: payload.name } : {},
              payload.slug ? { slug: payload.slug } : {},
            ],
          },
        ],
      },
    });

    if (duplicate) {
      throw new AppError(
        httpStatus.CONFLICT,
        "Category name or slug already exists",
      );
    }
  }

  const result = await prisma.category.update({
    where: { id },
    data: payload,
    select: categorySelect,
  });

  return result;
};

const deleteCategory = async (id: string) => {
  const isExists = await prisma.category.findUnique({
    where: { id },
  });

  if (!isExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  await prisma.category.delete({
    where: { id },
  });

  return null;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
