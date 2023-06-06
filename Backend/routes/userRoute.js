const userController = require('../controllers/userController');
const userRoute = require('express').Router();

userRoute.route('/register').post(userController.register);
userRoute.route('/login').post(userController.login);

module.exports = userRoute;