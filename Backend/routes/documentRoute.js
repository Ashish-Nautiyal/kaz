const documentController = require('../controllers/documentController');
const documentRoute = require('express').Router();
const auth = require('../middleware/authMiddleware');
const multer = require("multer");
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/documents");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: multerStorage });

documentRoute.route('/addDocument').post(auth, upload.single('document'), documentController.addDocument);
documentRoute.route('/getDocuments').get(auth, documentController.getDocuments);
documentRoute.route('/deleteDocument/:_id').delete(auth, documentController.deleteDocument);

module.exports = documentRoute; 