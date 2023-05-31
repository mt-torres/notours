const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

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

// app.get('/', (req, resp) => {
//   resp
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/', (res, resp) => {
//   resp.send('You can post to this endpoint');
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8'));

// 2) Route handlers
function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestedTime,
    data: {
      tours,
    },
  });
}

function getTour(req, res) {
  const id = +req.params.id;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'ID not found',
    });
  }

  const tour = tours.find(i => i.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}

function createTour(req, resp) {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    resp.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  });
}

function updateTour(req, res) {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
}

function deleteTour(req, res) {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
}

//app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) Routes
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

// 4) Start server

const port = 3000;
app.listen(port, () => {
  console.log(`App ruining on port ${port}...`);
});
