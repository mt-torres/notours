const { CastError } = require('mongoose');
const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path.replace('_', '')}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = err => {
  const message = `Duplicated field value: ${err.keyValue.name}. Please use another`;
  return new AppError(message, 400);
};

const handleInvalidFieldDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid value for field: ${errors.join('. ')}`;
  // const message = err.errors.map((item, index) => item[index].message);
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    statusCode: err.statusCode,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    //Programing or other unknow error: Dont't leak error details to the user
  } else {
    //Log error
    console.error('Error 💥', err);
    // Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err instanceof CastError) error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleInvalidFieldDB(error);
    sendErrorProd(error, res);
  }
};
