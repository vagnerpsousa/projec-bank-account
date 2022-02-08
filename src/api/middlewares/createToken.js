require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

module.exports = (customer) => {
  const { password, ...customerWhitoutPassword } = customer;
  const token = jwt.sign(customerWhitoutPassword, SECRET, jwtConfig);

  return token;
};