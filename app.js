const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) Middlawares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); //middleware
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

// 3) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'Fail';
  err.statusCode = 500;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    statusCode: err.statusCode,
  });
});

module.exports = app;

//GEyNEtb6cGBQzfDq
