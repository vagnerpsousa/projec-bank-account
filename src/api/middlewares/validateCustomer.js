const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const { customerService } = require('../services');

const cpfSize = 11;
const minFullName = 3;
const minCharacterPassword = 6;

const schema = Joi.object({
  fullName: Joi.string().min(minFullName).required(),
  cpf: Joi.string().length(cpfSize).required(),
  email: Joi.string().required().email(),
  accountType: Joi.string().required().equal('poupança', 'corrente'),
  password: Joi.string().length(minCharacterPassword).required(),
});

module.exports = async (req, res, next) => {
  const { fullName, cpf, email } = req.body;

  const { error } = schema.validate(req.body);
  if (error) return next(error);

  const arrayName = fullName.split(' ');

  if (arrayName.length < 2) {
    return next({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Inform the full name',
    });
  }

  let customerExists = await customerService.getByCpfOrEmail(cpf);

  customerExists = await customerService.getByCpfOrEmail(email);

  if (customerExists) {
    return next({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'cpf or email already registered',
    });
  }

  return next();
};
