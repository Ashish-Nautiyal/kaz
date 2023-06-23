const adminController = require('../controllers/adminController');
const adminRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');

adminRoute.route('/addSubAdmin').post(adminController.register);
adminRoute.route('/login').post(adminController.login);
adminRoute.route('/getSubAdmins').get(auth, adminController.getSubAdmins);
adminRoute.route('/editSubAdmin/:_id').get(auth, adminController.editSubAdmin);
adminRoute.route('/updateSubAdmin').post(auth, adminController.updateSubAdmin);
adminRoute.route('/deleteSubAdmin/:_id').delete(auth, adminController.deleteSubAdmin);
adminRoute.route('/searchSubAdmin/:search').get(auth, adminController.searchSubAdmins);
adminRoute.route('/changePassword').post(auth, adminController.changePassword);
adminRoute.route('/sendNotificationToUser').post(auth, adminController.sendNotificationToUser);


module.exports = adminRoute;