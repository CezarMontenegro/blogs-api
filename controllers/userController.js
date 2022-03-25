const user = require('express').Router();
const rescue = require('express-rescue');
const userService = require('../services/userService');
  
user.post('/', rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const data = { displayName, email, password, image };

  const token = await userService.create(data);
  
  res.status(201).json(token);
}));

user.get('/', rescue(async (req, res) => {
  const { authorization } = req.headers;

  const result = await userService.getAll(authorization);

  res.status(200).json(result);
}));

user.get('/:id', rescue(async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const result = await userService.getById(authorization, id);

  res.status(200).json(result);
}));

user.delete('/me', rescue(async (req, res) => {
  const { authorization } = req.headers;

  await userService.destroyMe(authorization);

  res.status(204).end();
}));

module.exports = user;