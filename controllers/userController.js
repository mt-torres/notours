const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf8'));

exports.getAllUsers = (req, res) => {
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
};

exports.getUser = (req, res) => {
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
};

exports.createUser = (req, res) => {
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
};

exports.updateUser = (req, res) => {
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
};
exports.deleteUser = (req, res) => {
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
};
