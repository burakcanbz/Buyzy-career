const express = require('express');
const { authUser, logoutUser } = require('../controllers/userController');


const router = express.Router();

router.route('/login').post(authUser);
router.route('/logout').post(logoutUser);

module.exports = { userRoutes: router};