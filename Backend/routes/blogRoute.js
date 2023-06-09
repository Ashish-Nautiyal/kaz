const blogController = require('../controllers/blogController');
const blogRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');
const multer = require("multer");
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/blog-images");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: multerStorage });

blogRoute.route('/addBlog').post(auth, upload.single('blog_image'), blogController.addBlog);
blogRoute.route('/getBlog').get(auth, blogController.getBlogs);
blogRoute.route('/editBlog/:_id').get(auth, blogController.editBlogs);
blogRoute.route('/updateBlog').post(auth, upload.single('blog_image'), blogController.updateBlog);
blogRoute.route('/deleteBlog/:_id').delete(auth, blogController.deleteBlog);
blogRoute.route('/searchBlog/:search').get(auth, blogController.searchBlog);
blogRoute.route('/getBlogDetail/:_id').get(auth, blogController.getBlogDetail);

module.exports = blogRoute; 