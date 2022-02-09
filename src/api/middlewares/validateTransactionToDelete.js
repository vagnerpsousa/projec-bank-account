const { StatusCodes } = require('http-status-codes');
const { customerService, transactionService } = require('../services');

module.exports = async (req, _res, next) => {
  const { id } = req.params;
  const transactionData = await transactionService.getById(id);
  const { value } = transactionData;
  const receivingAccountId = transactionData.receiving_account_id;

  req.transactionData = transactionData;

  const receiverData = await customerService.getBankDetails(receivingAccountId);

  const balanceReceiver = receiverData.dataValues.balance;

  if (balanceReceiver < value) {
    return next({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Insufficient balance to cancel transfer',
    });
  }

  return next();
};
