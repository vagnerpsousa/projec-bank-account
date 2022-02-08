const { StatusCodes } = require('http-status-codes');
const { transactionService } = require('../services');

module.exports = async (req, _res, next) => {

  const transaction = await transactionService.getById(req.params.id);
  
  if (!transaction) {
    return next({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Transaction does not exist',
    });
  };

  next();
};
