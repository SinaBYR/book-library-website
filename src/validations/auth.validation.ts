import Joi from 'joi';

export const register = Joi.object({
  fullName: Joi.string().required().messages({
    'any.required': 'Full Name is required'
  }),
  email: Joi.string().required().email().messages({
    'any.required': 'Email is required',
    'string.email': 'Email is not a valid email address'
  }),
  password: Joi.string().required().min(8).strict().messages({
    'any.required': 'Password is required',
    'string.min': 'Password length must be at least 8 characters long'
  }),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required().strict().messages({
    'any.required': 'Password is required',
    'any.only': 'Passwords don\'t match'
  })
})