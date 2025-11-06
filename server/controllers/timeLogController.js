import TimeLog from "../models/TimeLog.js";

// @desc    Start a new timer for a task
// @route   POST /api/timelogs/start
export const startTimer = async (req, res, next) => {
  const { taskId } = req.body;
  const userId = req.userId; // From 'protect' middleware

  try {
    // Check if another timer is already running for this user
    const activeTimer = await TimeLog.findOne({ user: userId, endTime: null });
    if (activeTimer) {
      return res
        .status(400)
        .json({ message: "Please stop the active timer before starting a new one." });
    }

    // Create and save the new time log
    const newLog = await TimeLog.create({
      user: userId,
      task: taskId,
      startTime: new Date(),
    });
    res.status(201).json(newLog);
  } catch (error) {
    next(error);
  }
};

// @desc    Stop an active timer
// @route   PUT /api/timelogs/stop/:id
export const stopTimer = async (req, res, next) => {
  const logId = req.params.id;
  const userId = req.userId;

  try {
    const log = await TimeLog.findById(logId);

    // 1. Check if log exists
    if (!log) {
      return res.status(404).json({ message: "Time log not found." });
    }

    // 2. Check if this log belongs to the user
    if (log.user.toString() !== userId) {
      return res.status(401).json({ message: "Not authorized." });
    }

    // 3. Check if it's already stopped
    if (log.endTime !== null) {
      return res.status(400).json({ message: "This timer is already stopped." });
    }

    // Stop the timer
    log.endTime = new Date();
    log.duration = Math.floor((log.endTime - log.startTime) / 1000); // Duration in seconds
    const updatedLog = await log.save();

    res.json(updatedLog);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all time logs for a specific task
// @route   GET /api/timelogs/task/:taskId
export const getLogsForTask = async (req, res, next) => {
  const { taskId } = req.params;
  const userId = req.userId;

  try {
    const logs = await TimeLog.find({ user: userId, task: taskId }).sort({
      startTime: -1,
    });
    res.json(logs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get the user's currently active timer (if any)
// @route   GET /api/timelogs/active
export const getActiveTimer = async (req, res, next) => {
  const userId = req.userId;
  try {
    // Find the log that has not been stopped
    const activeTimer = await TimeLog.findOne({
      user: userId,
      endTime: null,
    }).populate("task", "title"); // .populate() adds task info (like title) to the response

    res.json(activeTimer);
  } catch (error) {
    next(error);
  }
};