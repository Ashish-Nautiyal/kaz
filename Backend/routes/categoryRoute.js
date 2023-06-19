const categoryController = require('../controllers/categoryController');
const catRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');

catRoute.route('/addCategory').post(auth, categoryController.addCategory);
catRoute.route('/getCategory').get(auth, categoryController.getCategories);
catRoute.route('/editCategory/:_id').get(auth, categoryController.editCategory);
catRoute.route('/updateCategory').post(auth, categoryController.updateCategory);
catRoute.route('/deleteCategory/:_id').delete(auth, categoryController.deleteCategory);
catRoute.route('/searchCategory/:search').get(auth, categoryController.searchCategory);
catRoute.get('/searchCategory/:search', auth, categoryController.searchCategory);


module.exports = catRoute; 