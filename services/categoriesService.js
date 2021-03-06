const validationMiddlewares = require('../middlewares/validationMiddlewares');
const { Category } = require('../models');

const create = async (name, authorization) => {
  await validationMiddlewares.validateToken(authorization);
  validationMiddlewares.validateName(name);

  await Category.create({ name });

  const result = await Category.findOne({ where: { name } });

  return result;
};

const getAll = async (authorization) => {
  await validationMiddlewares.validateToken(authorization);

  const result = Category.findAll();

  return result;
};

module.exports = {
  create,
  getAll,
};