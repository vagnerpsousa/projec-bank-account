const { StatusCodes } = require('http-status-codes');
const { customerService, transactionService } = require('../services');

module.exports = async (req, _res, next) => {
  const { id } = req.params;
  const transactionData = await transactionService.getById(id);
  const { receiving_account_id, value } = transactionData;

  req.transactionData = transactionData;

  const receiverData = await customerService.getBankDetails(receiving_account_id);

  const balanceReceiver = receiverData.dataValues.balance;

  if (balanceReceiver < value) {
    return next({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Insufficient balance to cancel transfer'
    });
  };

  next();
};
