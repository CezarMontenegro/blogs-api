const post = require('express').Router();
const rescue = require('express-rescue');
const blogPostService = require('../services/blogPostService');

post.post('/', rescue(async (req, res) => {
  const { authorization } = req.headers;
  const { title, content, categoryIds } = req.body;
  const data = { title, content, categoryIds };

  const result = await blogPostService.create(authorization, data);

  res.status(201).json(result);
}));

post.get('/', rescue(async (req, res) => {
  const { authorization } = req.headers;

  const result = await blogPostService.getAll(authorization);

  res.status(200).json(result);
}));

post.get('/:id', rescue(async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const result = await blogPostService.getById(authorization, id);

  res.status(200).json(result);
}));

post.put('/:id', rescue(async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;

  const data = { authorization, id, title, content, categoryIds };

  const result = await blogPostService.update(data);

  res.status(200).json(result);  
}));

module.exports = post;