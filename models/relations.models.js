// Models
const { User } = require('./user.model');
const { Task } = require('./task.model');

const relations = () => {
  User.hasMany(Task, { foreignKey: 'userId' });
  Task.belongsTo(User);
};

module.exports = { relations };
