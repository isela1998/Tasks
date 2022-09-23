// Models
const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      include: [{ model: User, attributes: ['id', 'name', 'email', 'status'] }],
    });

    // Get response
    res.status(200).json({
      status: 'success',
      data: {
        tasks,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;
    const newTask = await Task.create({ title, userId, startDate, limitDate });

    // Get success response
    res.status(201).json({
      status: 'success',
      data: { newTask },
    });
  } catch (e) {
    console.log(e);
  }
};

// Get all task filtering by status
const tasksByStatus = async (req, res) => {
  try {
    const { status } = req;
    const tasks = await Task.findAll({
      where: { status },
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      include: [{ model: User, attributes: ['id', 'name', 'email', 'status'] }],
    });

    // Get response
    res.status(200).json({
      status: 'success',
      data: {
        tasks,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// Update status task
const updateTask = async (req, res) => {
  try {
    const { time } = req.body;
    const { task } = req;

    const finishTime = Date.parse(time);
    const startDate = Date.parse(task.startDate);
    const limitDate = Date.parse(task.limitDate);

    if (finishTime < startDate || !finishTime) {
      res.status(400).json({
        status: 'error',
        data: 'Must be provide a valid finish date',
      });
    } else if (finishTime <= limitDate) {
      await task.update({ finishDate: time, status: 'completed' });
    } else {
      await task.update({ finishDate: time, status: 'late' });
    }

    // Get success response
    res.status(200).json({
      status: 'success',
      data: { task },
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getAllTasks, createTask, tasksByStatus, updateTask };
