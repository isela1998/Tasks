// Models
const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

const validateActiveUser = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({
      where: { id: userId, status: 'active' },
    });

    // If id doesn't found, send error message
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found or inactive',
      });
    }

    next();
  } catch (e) {
    console.log(e);
  }
};

const validateStatus = async (req, res, next) => {
  try {
    const { status } = req.params;

    if (
      status !== 'active' &&
      status !== 'completed' &&
      status !== 'late' &&
      status !== 'cancelled'
    ) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid state',
      });
    }

    req.status = status;
    next();
  } catch (e) {
    console.log(e);
  }
};

const validateActiveTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id: id, status: 'active' },
    });

    // If id doesn't found, send error message
    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task with active status not found',
      });
    }

    req.task = task;
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  validateActiveUser,
  validateStatus,
  validateActiveTask,
};
