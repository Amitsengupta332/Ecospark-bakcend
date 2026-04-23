import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";
import bcryptJs from "bcryptjs";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import { USER_ROLE } from "../User/user.utils";

export type TAuthUser = {
  name?: string;
  email: string;
  password?: string;
  avatar?: string;
};

const registerUser = async (userData: TAuthUser) => {
  if (!userData.email || !userData.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required"
    );
  }

  const email = userData.email.trim().toLowerCase();
  const password = userData.password.trim();

  const isUserExists = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExists) {
    throw new AppError(httpStatus.CONFLICT, "User already exists!");
  }

  const hashedPassword = await bcryptJs.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  const user = await prisma.user.create({
    data: {
      name: userData.name?.trim() || "",
      email,
      password: hashedPassword,
      avatar: userData.avatar || "",
      role: USER_ROLE.MEMBER,
      status: "ACTIVE",
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

const loginUser = async (payload: TAuthUser) => {
  if (!payload.email || !payload.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required"
    );
  }

  const email = payload.email.trim().toLowerCase();
  const password = payload.password.trim();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  if (user.status === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "This account is blocked");
  }

  const isPasswordMatched = await bcryptJs.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
   config.jwt_access_expires_in as any
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as any
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      status: user.status,
    },
  };
};

const getNewAccessToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is required!");
  }

  const decoded = verifyToken(token, config.jwt_refresh_secret as string) as {
    id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  };

  const user = await prisma.user.findUnique({
    where: { email: decoded.email },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  if (user.status === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "This account is blocked");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as any
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
  getNewAccessToken,
};