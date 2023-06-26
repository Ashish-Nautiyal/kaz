const aboutUsController = require('../controllers/aboutUsController');
const aboutUsRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');

aboutUsRoute.route('/addAboutUs').post(aboutUsController.addAboutUs);
aboutUsRoute.route('/getAboutUs').get(auth, aboutUsController.getAboutUs);
aboutUsRoute.route('/updateAboutUs').post(auth, aboutUsController.updateAboutUs);


module.exports = aboutUsRoute;