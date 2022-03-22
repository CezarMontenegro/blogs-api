const validationMiddlewares = require('../middlewares/validationMiddlewares');
const { User } = require('../models');
const tokenGenerate = require('../helpers/jwtGenerator');

// const getAll = async () => {
//   await User.findAll
// }

const create = async (data) => {
  const { displayName, email, password } = data;

  validationMiddlewares.validateDisplayName(displayName);
  validationMiddlewares.validateEmail(email);
  await validationMiddlewares.validateEmailList(email);
  validationMiddlewares.validatePassword(password);

  await User.create(data);

  const token = await tokenGenerate(data);

  return token;
};

module.exports = {
  create,
};