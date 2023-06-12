const productController = require('../controllers/productController');
const productRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');

productRoute.route('/addProduct').post(productController.addProduct);
productRoute.route('/getProducts').get(auth, productController.getProducts);
productRoute.route('/editProduct/:_id').get(auth, productController.editProduct);
productRoute.route('/updateProduct').post(auth, productController.updateProduct);
productRoute.route('/deleteProduct/:_id').delete(auth, productController.deleteProduct);
productRoute.route('/searchProduct/:search').get(auth, productController.searchProduct);


module.exports = productRoute; 