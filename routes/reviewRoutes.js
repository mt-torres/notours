const express = require('express');
const { getAllReviews, createReview, deleteReview, updateReview, setTourUserIds, getReview } = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true }); // { mergeParams: true } para pegar  os parametros de '/:tour/reviews' vindo do tour Routes

router.use(protect);
router.route('/').get(getAllReviews).post(restrictTo('user'), setTourUserIds, createReview);
router.route('/:id').get(getReview).delete(restrictTo('admin', 'user'), deleteReview).patch(restrictTo('admin', 'user'), updateReview);

module.exports = router;
