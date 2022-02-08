const { StatusCodes } = require('http-status-codes');
const customerService = require('../services/customerService');

module.exports = async (req, _res, next) => {

  const customer = await customerService.getById(req.params.id);
  
  if (!customer) {
    return next({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Customer does not exist',
    });
  };

  next();
};
