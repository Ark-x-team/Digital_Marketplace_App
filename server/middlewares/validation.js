const jwt = require('jsonwebtoken');
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

// Set form validation rules
const validationRules = () => {

  return [
    // username rules
    body('username')
      .trim()
      .notEmpty()
      .escape()
      .withMessage('Must be a valid username'),

    // email rules
    body('email')
      .isEmail()
      .trim()
      .notEmpty()
      .withMessage('Must be a valid email'),

    // password must contain at least 8 characters (numbers, uppercase + lowercase letters)
    body('password')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .withMessage('Password not strong enough'),
  ]
}

// Updated data validation rules
const newDataValidationRules = () => {
  return [
    // username rules
    body('username')
      .optional()
      .trim()
      .notEmpty()
      .escape()
      .withMessage('Must be a valid username'),

    // email rules
    body('email')
      .optional()
      .isEmail()
      .trim()
      .notEmpty()
      .withMessage('Must be a valid email'),

    // password must contain at least 8 characters (numbers, uppercase + lowercase letters)
    body('password')
      .optional()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .withMessage('Password not strong enough'),
  ]
}

// Data validation
const dataValidation = (req, res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()) {
    return next()
  } else return res.status(400).json({status: 400, errors: result.errors})
}

// Set password validation rules
const passwordValidationRules = () => {
  return [
    // password must contain at least 8 characters (numbers, uppercase + lowercase letters)
    body('newPassword')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .withMessage('Password not strong enough'),
  ]
}
module.exports = { validationRules, passwordValidationRules, newDataValidationRules, dataValidation }
