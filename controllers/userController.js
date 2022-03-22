const user = require('express').Router();
const rescue = require('express-rescue');
const userService = require('../services/userService');

user.post('/', rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const data = { displayName, email, password, image };

  const token = await userService.create(data);
  
  res.status(201).json(token);
}));

module.exports = user;