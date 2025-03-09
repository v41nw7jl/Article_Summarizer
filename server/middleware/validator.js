const { body, validationResult } = require('express-validator');

const validateSummaryRequest = [
  body('url').isURL().withMessage('Invalid URL format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateSummaryRequest };