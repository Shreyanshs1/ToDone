import Task from "../models/Task.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    console.log(req.body);

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      user: req.userId, // This comes from your 'protect' middleware
      title,
      description,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};


export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if task belongs to the user
    if (task.user.toString() !== req.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update fields
    task.title = title || task.title;
    task.description =
      description !== undefined ? description : task.description;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if task belongs to the user
    if (task.user.toString() !== req.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task removed" });
  } catch (error) {
    next(error);
  }
};