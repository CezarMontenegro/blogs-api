const jwt = require('jsonwebtoken');
const { User, Category } = require('../models');

const throwError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  throw err;
};

const validateDisplayName = (displayName) => {
  if (!displayName || typeof displayName !== 'string' || displayName.length < 8) {
    throwError('"displayName" length must be at least 8 characters long', 400);
  }
};

const validateEmail = (email) => {
  const testEmail = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/.test(email);
  
  if (email === '') {
    throwError('"email" is not allowed to be empty', 400);
  }
  if (!email) {
    throwError('"email" is required', 400);
  }
  if (!testEmail) {
    throwError('"email" must be a valid email', 400);
  }
};

const doesEmailExist = async (email) => {
  const emailList = await User.findAll({ where: {
      email,
  } });
  if (emailList.length !== 0) {
    throwError('User already registered', 409);
  }
};

const isEmailValid = async (email) => {
  const emailList = await User.findAll({ where: {
      email,
  } });
  if (emailList.length === 0) {
    throwError('Invalid fields', 400);
  }
};

const validatePassword = (password) => {
  if (password === '') {
    throwError('"password" is not allowed to be empty', 400);
  }
  if (!password) {
    throwError('"password" is required', 400);
  }
  if (password.length !== 6) {
    throwError('"password" length must be 6 characters long', 400);
  }
};

const validateToken = (authorization) => {
  if (!authorization) {
    throwError('Token not found', 401);
  }

  try {
    jwt.verify(authorization, process.env.JWT_SECRET);
  } catch (e) {
    throwError('Expired or invalid token', 401);
  }
};

const isIdValid = (id) => {
  const user = User.findByPk(id);

  return user;
};

const validateName = (name) => {
  if (!name) {
    throwError('"name" is required', 400);
  }
};

const validateTitle = (title) => {
  if (!title) {
    throwError('"title" is required', 400);
  }
};

const validateContent = (content) => {
  if (!content) {
    throwError('"content" is required', 400);
  }
};

const validateCategoryId = async (categoryIds) => {
  if (!categoryIds) {
    throwError('"categoryIds" is required', 400);
  }

  const categories = await Category.findAll();
  const categoriesArray = categories.map((category) => category.dataValues.id);
  
  categoryIds.forEach((category) => {
    if (!categoriesArray.includes(category)) {
      throwError('"categoryIds" not found', 400);
    }
  });
};

module.exports = {
  throwError,
  validateDisplayName,
  validateEmail,
  validatePassword,
  doesEmailExist,
  isEmailValid,
  validateToken,
  isIdValid,
  validateName,
  validateTitle,
  validateContent,
  validateCategoryId,
};
