const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1 get tour data from collection
  const tours = await Tour.find();
  //2 build template

  //3 Render that template using tour data from step 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  //1- get the data for the requested tour including the review and tour guides
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }
  //console.log(req.params.slug);
  //2 build template
  //3 Render that template using tour data from step 1

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  //3 Render login template
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getUserData = catchAsync(async (req, res, next) => {
  //const user = await User.findById(req.user.id); // we get the date via  res.locals.user = req.user = currentUser; from authController
  res.status(200).render('me', {
    title: 'Your account Settings',
    //user,
  });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1 - find all bookings
  const booking = await Booking.find({ user: req.user.id });
  // 2 - find tours with the returned ids
  const tourIds = booking.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render('me', {
    title: 'Your account Settings',
    user: updatedUser,
  });
});
