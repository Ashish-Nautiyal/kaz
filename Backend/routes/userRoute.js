const userController = require('../controllers/userController');
const userRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');

userRoute.route('/register').post(userController.register);
userRoute.route('/login').post(userController.login);
userRoute.route('/getSubAdmins').get(auth, userController.getSubAdmins);
userRoute.route('/editSubAdmin/:_id').get(auth, userController.editSubAdmin);
userRoute.route('/updateSubAdmin').post(auth, userController.updateSubAdmin);
userRoute.route('/deleteSubAdmin/:_id').delete(auth, userController.deleteSubAdmin);
userRoute.route('/searchSubAdmin/:search').get(auth, userController.searchSubAdmins);


module.exports = userRoute;