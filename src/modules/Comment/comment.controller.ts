import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentService } from "./comment.service";

const createComment = catchAsync(async (req, res) => {
  const result = await CommentService.createComment(req.user.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Comment created successfully",
    data: result,
  });
});

const getIdeaComments = catchAsync(async (req, res) => {
  const result = await CommentService.getIdeaComments(req.params.ideaId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comments retrieved successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  await CommentService.deleteComment(
    req.user.id,
    req.user.role,
    req.params.id as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted successfully",
    data: null,
  });
});

export const CommentController = {
  createComment,
  getIdeaComments,
  deleteComment,
};