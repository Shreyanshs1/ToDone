import TimeLog from "../models/TimeLog.js";
import Task from "../models/Task.js";

// @desc    Get a summary of activity for the current day
// @route   GET /api/summary/today
export const getTodaySummary = async (req, res, next) => {
  try {
    const userId = req.userId;

    // --- 1. Define "Today" ---
    // Get the start of today (00:00:00)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Get the end of today (23:59:59)
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // --- 2. Query 1: Get Today's Completed Logs ---
    const todayLogs = await TimeLog.find({
      user: userId,
      endTime: { $ne: null }, // Only find completed logs
      startTime: { $gte: todayStart, $lte: todayEnd }, // Must have started today
    });

    // --- 3. Process the Logs ---
    // Calculate total time from the logs' duration field
    const totalTimeTrackedToday = todayLogs.reduce(
      (acc, log) => acc + log.duration,
      0
    );

    // Get a unique list of tasks that were worked on
    const taskIds = [...new Set(todayLogs.map((log) => log.task.toString()))];

    // --- 4. Query 2: Get Details for Tasks Worked On ---
    const tasksWorkedOnToday = await Task.find({
      _id: { $in: taskIds },
      user: userId, // Double-check user ownership
    }).select("title status"); // Only select the fields we need

    // --- 5. Query 3: Get Status Counts for ALL Tasks ---
    // We run these in parallel for speed
    const [completedCount, inProgressCount, pendingCount] = await Promise.all([
      Task.countDocuments({ user: userId, status: "Completed" }),
      Task.countDocuments({ user: userId, status: "In Progress" }),
      Task.countDocuments({ user: userId, status: "Pending" }),
    ]);

    // --- 6. Assemble and Send the Final JSON ---
    res.json({
      totalTimeTrackedToday, // Total seconds tracked
      tasksWorkedOnToday, // Array of task objects
      taskCounts: {
        completed: completedCount,
        inProgress: inProgressCount,
        pending: pendingCount,
      },
    });
  } catch (error) {
    next(error);
  }
};