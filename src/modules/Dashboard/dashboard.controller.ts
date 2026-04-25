import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DashboardService } from "./dashboard.service";

const getMemberDashboard = catchAsync(async (req, res) => {
  const result = await DashboardService.getMemberDashboard(req.user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member dashboard data retrieved",
    data: result,
  });
});

const getAdminDashboard = catchAsync(async (req, res) => {
  const result = await DashboardService.getAdminDashboard();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin dashboard data retrieved",
    data: result,
  });
});

export const DashboardController = {
  getMemberDashboard,
  getAdminDashboard,
};