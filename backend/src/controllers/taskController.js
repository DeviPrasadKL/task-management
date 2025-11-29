const Task = require('../models/Task');

const listTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;
    const filter = {};
    // if user is normal, only show their tasks
    if (req.user.role !== 'admin') filter.createdBy = req.user.id;
    const total = await Task.countDocuments(filter);
    const tasks = await Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('createdBy', 'name email');
    res.json({ tasks, page, limit, total });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const task = new Task({ title, description, status: status || 'pending', createdBy: req.user.id });
    await task.save();
    res.json({ task });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    // normal users can only edit their tasks
    if (req.user.role !== 'admin' && String(task.createdBy) !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    Object.assign(task, data);
    await task.save();
    res.json({ task });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id).populate('createdBy', 'name email');

    if (!task) return res.status(404).json({ message: "Task not found" });

    // non-admin cannot view others' tasks
    if (req.user.role !== 'admin' && String(task.createdBy._id) !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { listTasks, getTask, createTask, updateTask, deleteTask };
