const categories = require('express').Router();
const rescue = require('express-rescue');
const categoriesService = require('../services/categoriesService');

categories.post('/', rescue(async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;

  const result = await categoriesService.create(name, authorization);

  res.status(201).json(result);
}));

categories.get('/', rescue(async (req, res) => {
  const { authorization } = req.headers;

  const result = await categoriesService.getAll(authorization);

  res.status(200).json(result);
}));

module.exports = categories;