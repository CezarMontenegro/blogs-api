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

  const test = await BlogPost.findByPk(id);

  if (!test) validationMiddlewares.throwError('Post does not exist', 404);
  
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

const update = async (authorization, id, title, content, categoryIds) => {
  await validationMiddlewares.validateToken(authorization);
  validationMiddlewares.validateTitle(title);
  validationMiddlewares.validateContent(content);

  if (categoryIds) {
    validationMiddlewares.throwError('Categories cannot be edited', 400);
  }

  const userId = await validationMiddlewares.getUserId(authorization);

  if (userId !== Number(id)) {
    validationMiddlewares.throwError('Unauthorized user', 401);
  }

  await BlogPost.update({ title, content }, { where: { id } });
  
  const result = await BlogPost.findAll({ where: { id },
    attributes: { exclude: ['id'] },
    include: {
      model: Category, as: 'categories', through: { attributes: [] },
    } });
        
  return result[0];
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};