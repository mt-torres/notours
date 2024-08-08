const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser, updateMe, deleteMe, getMe, uploadUserPhoto, resizeUserPhoto } = require('../controllers/userController');
const { signup, login, forgetPassword, resetPassword, updatePassword, protect, restrictTo, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/loggout', logout);
router.post('/forgotPassword', forgetPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect); // posso remover a funcção protect das rotas, já ele vai rodar com um middleware

router.patch('/updateMyPassword', updatePassword);

router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
