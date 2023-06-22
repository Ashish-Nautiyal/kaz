const productController = require('../controllers/productController');
const productRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');
const multer = require("multer");
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/product-images");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: multerStorage });

productRoute.route('/addProduct').post(upload.fields([{name: "product_image"}, {name: "images"},{name:"documents"},{name:"video"}]),productController.addProduct);
productRoute.route('/getProducts').get(auth, productController.getProducts);
productRoute.route('/getProductsDetail/:_id').get(auth, productController.getProductDetail);
productRoute.route('/editProduct/:_id').get(auth, productController.editProduct);
productRoute.route('/updateProduct').post(auth, productController.updateProduct);
productRoute.route('/deleteProduct/:_id').delete(auth, productController.deleteProduct);
productRoute.route('/searchProduct/:search').get(auth, productController.searchProduct);


module.exports = productRoute; 