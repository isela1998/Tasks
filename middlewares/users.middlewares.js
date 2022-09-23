// Models
const { User } = require('../models/user.model');

const validateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id, status: 'active' } });

    // If id doesn't found, send error message
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  validateUser,
};
