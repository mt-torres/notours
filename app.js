const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/tourRoutes');

const app = express();

// 1) Middlawares
app.use(morgan('dev'));

app.use(express.json()); //middleware

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

module.exports = app;
