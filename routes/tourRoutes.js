const express = require('express');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getBusiestMonths,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');

//Merge params
const reviewRoutes = require('./reviewRoutes');

const router = express.Router();

// router.param('id', checkID);
router.route('/stats').get(getTourStats);
router.route('/busiest-months/:year').get(protect, restrictTo('admin', 'lead-guide', 'guide'), getBusiestMonths);

router.route('/').get(getAllTours).post(protect, restrictTo('admin', 'lead-guide'), createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), uploadTourImages, resizeTourImages, updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(getToursWithin);
// /tours-within/233/center/-6.227079,-35.045254/unit/mi
// / tours-within?distance=233&center=-40,45&unit=mi
router.route('/distances/:latlng/unit/:unit').get(getDistances);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

//nested routes, tours e avaliações

//router.route('/:tourId/reviews').post(protect, restrictTo('user'), createReview); substituido pela linha abaixo

router.use('/:tourId/reviews', reviewRoutes);

module.exports = router;
