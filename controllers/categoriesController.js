const categories = require('express').Router();
const rescue = require('express-rescue');
const categoriesService = require('../services/categoriesService');

categories.post('/', rescue(async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;

  const result = await categoriesService.create(name, authorization);

  res.status(201).json(result);
}));

module.exports = categories;