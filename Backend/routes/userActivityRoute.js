const ActivityController = require('../controllers/userActivityController');
const activityRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');

activityRoute.route('/userLogin').post(auth,ActivityController.sessionlogin);
activityRoute.route('/userLogout').post(auth, ActivityController.sessionLogout);


module.exports = activityRoute; 