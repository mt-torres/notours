const { mongoose } = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Exception: 💥 Shuting down...');
  process.exit(1);
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    //useNewUrlPaser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
  })
  .then(() => console.log('DB connectionsuccessful!'));
// .catch(err => console.log('error'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App ruining on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection: 💥 Shuting down...');
  server.close(() => {
    process.exit(1);
  });
});

//de.js v14.17.6.
