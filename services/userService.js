const validationMiddlewares = require('../middlewares/validationMiddlewares');
const { User } = require('../models');
const tokenGenerate = require('../helpers/jwtGenerator');

const create = async (data) => {
  const { displayName, email, password } = data;

  validationMiddlewares.validateDisplayName(displayName);
  validationMiddlewares.validateEmail(email);
  await validationMiddlewares.doesEmailExist(email);
  validationMiddlewares.validatePassword(password);

  await User.create(data);

  const token = await tokenGenerate(data);

  return token;
};

const getAll = async (authorization) => {
  validationMiddlewares.validateToken(authorization);
  
  const result = await User.findAll();

  return result;
};

module.exports = {
  create,
  getAll,
};