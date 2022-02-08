const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
const customerService = require('../services/customerService');
const { validateLogin } = require('../middlewares');


router.post('/', validateLogin, async (req, res, _next) => {
  const token = await customerService.login(req.body);

  if (token === null) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid email or password' });
  };

  res.status(StatusCodes.OK).json({ token });
});

module.exports = router;