const express = require('express');

// Controllers
const {
  getAllTasks,
  createTask,
  tasksByStatus,
  updateTask,
} = require('../controllers/tasks.controller');

// Middlewares
const {
  validateActiveUser,
  validateStatus,
  validateActiveTask,
} = require('../middlewares/tasks.middlewares');

const {
  createTaskValidators,
} = require('../middlewares/validators.middlewares');

const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);

tasksRouter.post('/', createTaskValidators, validateActiveUser, createTask);

tasksRouter.get('/:status', validateStatus, tasksByStatus);

tasksRouter.patch('/:id', validateActiveTask, updateTask);

// tasksRouter.delete('/:id', validateId, deleteUser);

module.exports = { tasksRouter };
