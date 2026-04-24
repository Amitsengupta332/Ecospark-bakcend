import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { VoteService } from "./vote.service";

const voteIdea = catchAsync(async (req, res) => {
  const result = await VoteService.voteIdea(req.user.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vote submitted successfully",
    data: result,
  });
});

const removeVote = catchAsync(async (req, res) => {
  await VoteService.removeVote(req.user.id, req.params.ideaId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vote removed successfully",
    data: null,
  });
});

export const VoteController = {
  voteIdea,
  removeVote,
};