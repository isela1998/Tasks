const express = require('express');

// Controllers
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

// Middlewares
const { validateUser } = require('../middlewares/users.middlewares');
const {
  createUserValidators,
} = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);

usersRouter.post('/', createUserValidators, createUser);

usersRouter.patch('/:id', validateUser, updateUser);

usersRouter.delete('/:id', validateUser, deleteUser);

module.exports = { usersRouter };
