const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
const customerService = require('../services/customerService');
const { validateCustomer, doesCustomerExists, validateToken } = require('../middlewares');


router.post('/', validateCustomer, async (req, res, next) => {
  try {

    const token = await customerService.create(req.body);

    res.status(StatusCodes.CREATED).json({token});

  } catch (error) {

    next(error)

  }
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

router.get('/:id', validateToken, doesCustomerExists, async (req, res, _next) => {

  const customer = await customerService.getById(req.params.id);

  return res.status(StatusCodes.OK).json(customer);
});

router.put('/:id', validateToken, doesCustomerExists, validateCustomer, async (req, res, _next) => {
  const { id } = req.params;

  const updatedCustomer = await customerService.updateById(id, req.body);

  return res.status(StatusCodes.OK).json(updatedCustomer);
});

router.delete('/:id', validateToken, doesCustomerExists, async (req, res, _next) => {

  await customerService.deleteById(req.params.id);

  return res.status(StatusCodes.NO_CONTENT).json({ message: 'Customer was deleted' });
});

module.exports = router;