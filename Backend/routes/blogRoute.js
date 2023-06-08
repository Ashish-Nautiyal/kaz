const blogController = require('../controllers/blogController');
const blogRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');

blogRoute.route('/addBlog').post(auth, blogController.addBlog);
blogRoute.route('/getBlog').get(auth, blogController.getBlogs);
blogRoute.route('/editBlog/:_id').get(auth, blogController.editBlogs);
blogRoute.route('/updateBlog').post(auth, blogController.updateBlog);
blogRoute.route('/deleteBlog/:_id').delete(auth, blogController.deleteBlog);
blogRoute.route('/searchBlog/:search').get(auth, blogController.searchBlog);

module.exports = blogRoute; 