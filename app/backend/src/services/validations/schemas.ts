import Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'All fields must be filled',
    'string.email': 'Invalid email or password',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'All fields must be filled',
  }),
});

export default loginSchema;
