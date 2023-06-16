const dotenv = require('dotenv');
const { mongoose } = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    //useNewUrlPaser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
  })
  .then(() => {
    //console.log(con.connections);
    console.log('DB connectionsuccessful!');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App ruining on port ${port}...`);
});

//de.js v14.17.6.
