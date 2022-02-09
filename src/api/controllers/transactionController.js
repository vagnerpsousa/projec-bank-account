const express = require('express');
const { StatusCodes } = require('http-status-codes');

const router = express.Router();
const transactionService = require('../services/transactionService');
const {
  validateToken,
  validateTransactionToCreate,
  validateTransactionToDelete,
  doesTransactionExists,
} = require('../middlewares');

router.post('/', validateToken, validateTransactionToCreate, async (req, res, next) => {
  try {
    const { issuing_account_id } = req;
    const { receiving_account_id } = req;
    const { value, transactionType } = req.body;

    const transaction = await transactionService.create(
      issuing_account_id,
      receiving_account_id,
      value,
      transactionType,
    );

    res.status(StatusCodes.CREATED).json(transaction);
  } catch (error) {
    next(error);
  }
});

router.get('/', validateToken, async (req, res, next) => {
  const transactions = await transactionService.getAll();

  if (!transactions) {
    return next({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'No transaction registrations',
    });
  }

  return res.status(StatusCodes.OK).json(transactions);
});

router.get('/:id', validateToken, doesTransactionExists, async (req, res) => {
  const transaction = await transactionService.getById(req.params.id);

  return res.status(StatusCodes.OK).json(transaction);
});

router.delete('/:id', validateToken, doesTransactionExists, validateTransactionToDelete, async (req, res) => {
  await transactionService.deleteById(req.params.id, req.transactionData);

  return res.status(StatusCodes.NO_CONTENT).json({ message: 'Transaction was deleted' });
});

module.exports = router;
