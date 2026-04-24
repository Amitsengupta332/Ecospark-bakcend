import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { IdeaService } from "./idea.service";

const createIdea = catchAsync(async (req, res) => {
  const result = await IdeaService.createIdea(req.user.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Idea created successfully",
    data: result,
  });
});

const getAllIdeas = catchAsync(async (req, res) => {
  const result = await IdeaService.getAllIdeas(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ideas retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleIdea = catchAsync(async (req, res) => {
  const result = await IdeaService.getSingleIdea(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Idea retrieved successfully",
    data: result,
  });
});

const updateIdea = catchAsync(async (req, res) => {
  const result = await IdeaService.updateIdea(
    req.user.id,
    req.user.role,
    req.params.id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Idea updated successfully",
    data: result,
  });
});

const deleteIdea = catchAsync(async (req, res) => {
  await IdeaService.deleteIdea(req.user.id, req.user.role, req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Idea deleted successfully",
    data: null,
  });
});

const submitIdea = catchAsync(async (req, res) => {
  const result = await IdeaService.submitIdea(req.user.id, req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Idea submitted for review",
    data: result,
  });
});

const approveIdea = catchAsync(async (req, res) => {
  const result = await IdeaService.approveIdea(req.params.id as string, req.user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Idea approved successfully",
    data: result,
  });
});

const rejectIdea = catchAsync(async (req, res) => {
  const result = await IdeaService.rejectIdea(
    req.params.id as string,
    req.user.id,
    req.body.message
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Idea rejected successfully",
    data: result,
  });
});

export const IdeaController = {
  createIdea,
  getAllIdeas,
  getSingleIdea,
  updateIdea,
  deleteIdea,
  submitIdea,
  approveIdea,
  rejectIdea,
};