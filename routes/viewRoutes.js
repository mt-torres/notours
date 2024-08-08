const express = require('express');
const router = express.Router();
const { getOverview, getTour, getLoginForm, getUserData, getMyTours } = require('../controllers/viewController');
const { protect, isLoggedIn } = require('../controllers/authController');
const { createBookingCheckout } = require('../controllers/bookingController');

router.get('/', createBookingCheckout, isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getUserData);
router.get('/my-tours', protect, getMyTours);

//router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
