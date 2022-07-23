const { CustomAPIError } = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(500).render('error', {msg: err.message });
};

module.exports = errorHandlerMiddleware;
