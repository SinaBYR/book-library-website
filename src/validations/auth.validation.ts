import Joi from 'joi';

export const login = Joi.object({
  email: Joi.string().required().email().messages({
    'any.required': 'Enter your email address',
    'string.empty': 'Enter your email address',
    'string.email': 'Email address is not valid'
  }),
  password: Joi.string().required().strict().messages({
    'any.required': 'Enter a password',
    'string.empty': 'Enter a password',
  }),
});

export const register = Joi.object({
  fullName: Joi.string().required().messages({
    'any.required': 'Enter your full name',
    'string.empty': 'Enter your full name'
  }),
  email: Joi.string().required().email().messages({
    'any.required': 'Enter your email address',
    'string.empty': 'Enter your email address',
    'string.email': 'Email address is not valid'
  }),
  password: Joi.string().required().min(8).strict().messages({
    'any.required': 'Enter a password',
    'string.empty': 'Enter a password',
    'string.min': 'Password length must be at least 8 characters long'
  }),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required().strict().messages({
    'any.required': 'Confirm your password',
    'string.empty': 'Confirm your password',
    'any.only': 'Passwords don\'t match'
  })
}).prefs({
  abortEarly: false
});