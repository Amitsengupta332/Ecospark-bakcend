import { prisma } from "../../lib/prisma";

const getMemberDashboard = async (userId: string) => {
  const [totalIdeas, approvedIdeas, pendingIdeas, purchases] =
    await Promise.all([
      prisma.idea.count({ where: { authorId: userId } }),
      prisma.idea.count({
        where: { authorId: userId, status: "APPROVED" },
      }),
      prisma.idea.count({
        where: { authorId: userId, status: "UNDER_REVIEW" },
      }),
      prisma.purchase.count({
        where: { userId, paymentStatus: "PAID" },
      }),
    ]);

  return {
    totalIdeas,
    approvedIdeas,
    pendingIdeas,
    totalPurchases: purchases,
  };
};

const getAdminDashboard = async () => {
  const [
    totalUsers,
    totalIdeas,
    totalCategories,
    totalPaidIdeas,
    totalRevenue,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.idea.count(),
    prisma.category.count(),
    prisma.idea.count({ where: { isPaid: true } }),
    prisma.purchase.aggregate({
      _sum: { amount: true },
      where: { paymentStatus: "PAID" },
    }),
  ]);

  return {
    totalUsers,
    totalIdeas,
    totalCategories,
    totalPaidIdeas,
    totalRevenue: totalRevenue._sum.amount || 0,
  };
};

export const DashboardService = {
  getMemberDashboard,
  getAdminDashboard,
};