const { BlogPost, User, Category } = require('../models');
const validationMiddlewares = require('../middlewares/validationMiddlewares');

const create = async (authorization, data) => {
  const { title, content, categoryIds } = data;
 
  await validationMiddlewares.validateToken(authorization);
  validationMiddlewares.validateTitle(title);
  validationMiddlewares.validateContent(content);
  await validationMiddlewares.validateCategoryId(categoryIds);

  const userId = await validationMiddlewares.getUserId(authorization);

  const published = new Date().getTime();
  const updated = new Date().getTime();
  
  const newData = { title, content, categoryIds, userId, published, updated };

  await BlogPost.create(newData);

  const result = await BlogPost.findOne({ where: { title } });

  return result;
};

const getAll = async (authorization) => {
  await validationMiddlewares.validateToken(authorization);

  const result = BlogPost.findAll({ include: [{
    model: User,
    as: 'user',
    attributes: { exclude: 'password' },
  }, {
    model: Category,
    as: 'categories',
    through: {
        attributes: [],
    },
}] });

  return result;
};

const getById = async (authorization, id) => {
  await validationMiddlewares.validateToken(authorization);
  await validationMiddlewares.doesPostIdExist(id);  
  const result = await BlogPost.findAll({ where: { id },
    include: [{
        model: User,
        as: 'user',
        attributes: { exclude: 'password' },
    }, {
        model: Category,
        as: 'categories',
        through: {
            attributes: [],
        },
    }],
});

  return result[0];
};

const update = async (data) => {
  const { authorization, id, title, content, categoryIds } = data;

  await validationMiddlewares.validateToken(authorization);
  validationMiddlewares.validateTitle(title);
  validationMiddlewares.validateContent(content);
  await validationMiddlewares.validateIdLogado(authorization, id);

  if (categoryIds) {
    validationMiddlewares.throwError('Categories cannot be edited', 400);
  }

  await BlogPost.update({ title, content }, { where: { id } });
  
  const result = await BlogPost.findAll({ where: { id },
    attributes: { exclude: ['id'] },
    include: {
      model: Category, as: 'categories', through: { attributes: [] },
    } });
        
  return result[0];
};

const destroy = async (authorization, id) => {
  await validationMiddlewares.validateToken(authorization);
  await validationMiddlewares.doesPostIdExist(id);
  await validationMiddlewares.validateIdLogado(authorization, id);
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
};