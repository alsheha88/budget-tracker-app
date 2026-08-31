import type { RequestHandler } from "express";
import { dbGetDashboardStats } from "../../db/functions/stats/stats.js";


export const getDashboard:RequestHandler = async (req, res) => {
    const userId = req.user.id;

    const dashboardStats = await dbGetDashboardStats(userId);

    res.status(200).json({data: {dashboardStats}})
} 