// import { Prisma } from "../../../generated/prisma/client";
// import config from "../../config";
// import { prisma } from "../../lib/prisma";
// import bcryptJs from "bcryptjs";
// import { UserSearchableFields } from "./user.constant";
// export type TUserPayload = {
//   name: string;
//   email: string;
//   password: string;
//   role?: 'ADMIN' | 'USER';
//   img?: string;
//   rating?: number;
// };

// const createUser = async (user: TUserPayload) => {
//   const hashedPassword = await bcryptJs.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );

//   return await prisma.user.create({
//     data: {
//       name: user.name,
//       email: user.email,
//       password: hashedPassword,
//       role: user.role || 'USER',
    
//     },
//   });
// };

// const findUserById = async (userId: string) => {
//   return await prisma.user.findUnique({
//     where: { id: userId },
   
//   });
// };

// const getAllUsers = async (query: Record<string, unknown>) => {
//   const page = Number(query.page) || 1;
//   const limit = Number(query.limit) || 10;
//   const skip = (page - 1) * limit;
//   const searchTerm = query.searchTerm as string | undefined;
//   const sortBy = (query.sortBy as string) || 'createdAt';
//   const sortOrder = (query.sortOrder as 'asc' | 'desc') || 'desc';

//   // Build where clause
//   const whereConditions: Prisma.UserWhereInput[] = [];

//   // Search functionality
//   if (searchTerm) {
//     whereConditions.push({
//       OR: UserSearchableFields.map((field) => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive' as Prisma.QueryMode,
//         },
//       })),
//     });
//   }

//   // Filter by other fields (excluding pagination & search params)
//   const excludeFields = ['searchTerm', 'page', 'limit', 'sortBy', 'sortOrder', 'fields'];
//   const filterData = Object.fromEntries(
//     Object.entries(query).filter(([key]) => !excludeFields.includes(key)),
//   );

//   if (Object.keys(filterData).length > 0) {
//     whereConditions.push(filterData as Prisma.UserWhereInput);
//   }

//   const whereClause: Prisma.UserWhereInput =
//     whereConditions.length > 0 ? { AND: whereConditions } : {};

//   // Execute query
//   const [result, total] = await Promise.all([
//     prisma.user.findMany({
//       where: whereClause,
//       skip,
//       take: limit,
//       orderBy: { [sortBy]: sortOrder },
//     }),
//     prisma.user.count({ where: whereClause }),
//   ]);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//       totalPage: Math.ceil(total / limit),
//     },
//     data: result,
//   };
// };

// const updateUserById = async (userId: string, payload: Partial<TUserPayload>) => {
//   const result = await prisma.user.update({
//     where: { id: userId },
//     data: payload,
//   });
//   return result;
// };

// const deleteUserById = async (userId: string) => {
//   const result = await prisma.user.delete({
//     where: { id: userId },
//   });
//   return result;
// };


// export const UserService = {
//   createUser,
//   findUserById,
//   getAllUsers,
//   updateUserById,
//   deleteUserById,
// };

import { Prisma } from "../../../generated/prisma/client";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import bcryptJs from "bcryptjs";
import { UserSearchableFields } from "./user.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

export type TUserPayload = {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "USER";
};

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

const createUser = async (user: TUserPayload) => {
  const isUserExists = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (isUserExists) {
    throw new AppError(httpStatus.CONFLICT, "User already exists");
  }

  const hashedPassword = await bcryptJs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  return await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role || "USER",
    },
    select: userSelect,
  });
};

const findUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: userSelect,
  });
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = query.searchTerm as string | undefined;
  const sortBy = (query.sortBy as string) || "createdAt";
  const sortOrder = (query.sortOrder as "asc" | "desc") || "desc";

  const whereConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    whereConditions.push({
      OR: UserSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive" as Prisma.QueryMode,
        },
      })),
    });
  }

  const filterableFields = ["role", "email", "name"];
  const filterData = Object.fromEntries(
    Object.entries(query).filter(([key]) => filterableFields.includes(key))
  );

  if (Object.keys(filterData).length > 0) {
    whereConditions.push(filterData as Prisma.UserWhereInput);
  }

  const whereClause: Prisma.UserWhereInput =
    whereConditions.length > 0 ? { AND: whereConditions } : {};

  const [result, total] = await Promise.all([
    prisma.user.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: userSelect,
    }),
    prisma.user.count({ where: whereClause }),
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

const updateUserById = async (userId: string, payload: Partial<TUserPayload>) => {
  const updateData: Partial<TUserPayload> = { ...payload };

  if (payload.password) {
    updateData.password = await bcryptJs.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  const result = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: userSelect,
  });

  return result;
};

const deleteUserById = async (userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  });

  return null;
};

export const UserService = {
  createUser,
  findUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};