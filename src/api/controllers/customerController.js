const express = require('express');
const { StatusCodes } = require('http-status-codes');

const router = express.Router();
const customerService = require('../services/customerService');
const { validateCustomer, doesCustomerExists, validateToken } = require('../middlewares');

router.post('/', validateCustomer, async (req, res, next) => {
  const token = await customerService.create(req.body);

  if (!token) {
    return next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Something went wrong',
    });
  }

  return res.status(StatusCodes.CREATED).json({ token });
});

router.get('/', validateToken, async (req, res, next) => {
  const customers = await customerService.getAll();

  if (!customers) {
    return next({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'No customer registrations',
    });
  }

  return res.status(StatusCodes.OK).json(customers);
});

router.get('/:id', validateToken, doesCustomerExists, async (req, res) => {
  const customer = await customerService.getById(req.params.id, req.query.includesTransactions);

  return res.status(StatusCodes.OK).json(customer);
});

router.put('/:id', validateToken, doesCustomerExists, validateCustomer, async (req, res, next) => {
  const { id } = req.params;

  const updatedCustomer = await customerService.updateById(id, req.body);

  if (!updatedCustomer) {
    return next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Something went wrong',
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(updatedCustomer);
});

router.delete('/:id', validateToken, doesCustomerExists, async (req, res, next) => {
  const deletedCustomer = await customerService.deleteById(req.params.id);

  if (!deletedCustomer) {
    return next({
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Something went wrong',
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(deletedCustomer);
});

module.exports = router;
