const Tour = require('../models/tourModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage, price';
  req.query.fields = 'name, price, ratingsAverage, summary, difficult';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //const query = Object.getOwnPropertyNames(req.query).length === 0 ? await Tour.find() : await Tour.find({ duration: req.query.duration, difficulty: req.query.difficulty });
    //const query = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');
    //const query = await Tour.find(req.query);
    //const { page, sort, limit, fields, ...queryObj } = req.query; testar
    const queryObj = { ...req.query }; //criando uma copia de um objeto
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    //advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`));

    let query = Tour.find(queryStr);

    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      console.log(req.query.sort);

      query = query.sort(sortBy);
    }
    // else {
    //   query = query.sort('-createdAt'); // i have to remove this sort due to the Pagination
    // }

    //field limiting

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //Pagination
    //?page=2&limit=10
    // const { page, limit } = req.query;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page dos not exists');
    }

    const tours = await query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      requestedAt: req.requestedTime,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestedTime,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  // const newTour = new Tour({}); //the method of creating docs used in last classes
  // newTour.save();
  //new method
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
        runValidators: true,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      requestedAt: req.requestedTime,
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};
