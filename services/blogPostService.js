const jwt = require('jsonwebtoken');
const { BlogPost, User } = require('../models');
const validationMiddlewares = require('../middlewares/validationMiddlewares');

const create = async (authorization, data) => {
  const { title, content, categoryIds } = data;
 
  await validationMiddlewares.validateToken(authorization);
  validationMiddlewares.validateTitle(title);
  validationMiddlewares.validateContent(content);
  await validationMiddlewares.validateCategoryId(categoryIds);

  const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
  const { email } = decoded;
  const id = await User.findOne({ where: { email } });
  console.log(id);
  const userId = id.dataValues.id;
  console.log(userId);
  const published = new Date().getTime();
  const updated = new Date().getTime();
  
  const newData = { title, content, categoryIds, userId, published, updated };

  await BlogPost.create(newData);

  const result = await BlogPost.findOne({ where: { title } });

  return result;
};

module.exports = {
  create,
};