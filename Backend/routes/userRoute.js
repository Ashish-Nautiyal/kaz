const userController = require('../controllers/userController');
const userRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');

userRoute.route('/addUser').post(userController.addUser);
userRoute.route('/getUsers').get(auth, userController.getUsers);
userRoute.route('/editUser/:_id').get(auth, userController.editUser);
userRoute.route('/updateUser').post(auth, userController.updateUser);
userRoute.route('/deleteUser/:_id').delete(auth, userController.deleteUser);
userRoute.route('/searchUser/:search').get(auth, userController.searchUser);
userRoute.route('/registerUserCount').get(auth, userController.registerUserCount);
userRoute.route('/activeUserCount').get(auth, userController.activeUserCount);
userRoute.route('/inactiveUserCount').get(auth, userController.inactiveUserCount);
userRoute.route('/activateUser/:_id').get(auth, userController.activateUser);
userRoute.route('/deactivateUser/:_id').get(auth, userController.deactivateUser);
userRoute.route('/dateFilterActiveUsers').post(auth, userController.dateFilterActiveUsers);
userRoute.route('/currentMonthActiveUsers').get(auth, userController.currentMonthActiveUsers);
userRoute.route('/dateFilterDeactiveUsers').post(auth, userController.dateFilterDeactiveUsers);
userRoute.route('/currentMonthDeactiveUsers').get(auth, userController.currentMonthDeactiveUsers);

 
module.exports = userRoute;