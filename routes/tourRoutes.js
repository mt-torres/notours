const express = require('express');

const { getAllTours, createTour, getTour, updateTour, deleteTour, aliasTopTours, getTourStats, getBusiestMonths } = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkID);
router.route('/stats').get(getTourStats);
router.route('/busiest-months/:year').get(getBusiestMonths);
router.route('/').get(getAllTours).post(createTour);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
