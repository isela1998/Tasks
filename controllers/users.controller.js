// Models
const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: 'active' },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: Task,
          attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        },
      ],
    });

    // attributes: ['id', 'name', 'email', 'status']

    // Get response
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });

    // Get success response
    res.status(201).json({
      status: 'success',
      data: { newUser },
    });
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({ name, email });

    // Get success response
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await user.update({ status: 'deleted' });
    res.status(204).json({ status: 'success' });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
