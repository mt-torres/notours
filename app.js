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

// 2) Route handlers
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`, 'utf8'));

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

function getAllUsers(req, res) {
  if (!res) {
    return res.status(400).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
}

function getUser(req, res) {
  const userName = req.params.name[0].toUpperCase() + req.params.name.toLowerCase().slice(1);
  const user = users.find(user => user.name.includes(userName));
  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
}

function createUser(req, res) {
  if (!res) {
    return res.status(400).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
}

function updateUser(req, res) {
  if (!res) {
    return res.status(400).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
}
function deleteUser(req, res) {
  if (!res) {
    return res.status(400).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
}
// 3) Routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route(':name').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// 4) Start server

const port = 3000;
app.listen(port, () => {
  console.log(`App ruining on port ${port}...`);
});
