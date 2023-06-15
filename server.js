const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema); //creating the module

const testTour = new Tour({
  name: 'The Park Camper',
  // rating: 4.7,
  price: 997,
});

testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => console.log('ERROR', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App ruining on port ${port}...`);
});

//de.js v14.17.6.
