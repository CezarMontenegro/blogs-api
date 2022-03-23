const jwt = require('jsonwebtoken');

const config = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, config);
  return token;
};

module.exports = generateToken;