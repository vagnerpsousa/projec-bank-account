const Joi = require('joi');

const minCharacterPassword = 6;

const schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().length(minCharacterPassword).required(),
});

module.exports = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) return next(error);

  next();
};