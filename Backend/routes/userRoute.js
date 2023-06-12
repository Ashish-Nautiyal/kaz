const userController = require('../controllers/userController');
const userRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');

userRoute.route('/addUser').post(userController.addUser);
userRoute.route('/getUsers').get(auth, userController.getUsers);
userRoute.route('/editUser/:_id').get(auth, userController.editUser);
userRoute.route('/updateUser').post(auth, userController.updateUser);
userRoute.route('/deleteUser/:_id').delete(auth, userController.deleteUser);
userRoute.route('/searchUser/:search').get(auth, userController.searchUser);


module.exports = userRoute;