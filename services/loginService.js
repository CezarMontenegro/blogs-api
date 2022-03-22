const validationMiddlewares = require('../middlewares/validationMiddlewares');
const tokenGenerate = require('../helpers/jwtGenerator');

const create = async (data) => {
  const { email, password } = data;

  validationMiddlewares.validateEmail(email);
  await validationMiddlewares.isEmailValid(email);
  validationMiddlewares.validatePassword(password);

  const token = await tokenGenerate(data);

  return token;
};

module.exports = {
  create,
};