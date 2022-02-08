const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const { customerService } = require('../services');

const schema = Joi.object({
  cpfOrEmailIssuer: Joi.string().required(),
  cpfOrEmailReceiver: Joi.string().required(),
  transactionType: Joi.string().required().equal('depósito', 'transferência'),
  value: Joi.number().required().min(0.01).max(2000),
});

module.exports = async (req, _res, next) => {
  const { cpfOrEmailIssuer, cpfOrEmailReceiver, transactionType, value } = req.body;

  const { error } = schema.validate(req.body);
  if (error) return next(error);

  const issuer = await customerService.getByCpfOrEmail(cpfOrEmailIssuer);

  if (!issuer) {
    return next({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Issuer does not exist'
    });
  };
  req.issuing_account_id = issuer.dataValues.id;

  const receiver = await customerService.getByCpfOrEmail(cpfOrEmailReceiver);

  if (!receiver) {
    return next({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Receiver does not exist'
    });
  };
  req.receiving_account_id = receiver.dataValues.id;

  if (transactionType === 'transferência') {
    const issuerData = await customerService.getBankDetails(issuer.dataValues.id);
    const balanceIssuer = issuerData.dataValues.balance;
    if (balanceIssuer < value) {
      return next({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Insufficient balance for transfer'
      });
    };
  };

  next();
};
