const jwt = require('jsonwebtoken');

const config = {
  expiresIn: '365d',
};

module.exports = (data) => jwt.sign(data, process.env.JWT_SECRET, config);