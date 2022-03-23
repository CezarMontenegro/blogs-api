const login = require('express').Router();
const rescue = require('express-rescue');
const loginService = require('../services/loginService');

login.post('/', rescue(async (req, res) => {
  const { email, password } = req.body;
  const data = { email, password };

  const token = await loginService.create(data);

  return res.status(200).json({ token });
}));

module.exports = login;