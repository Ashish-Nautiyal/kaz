const Document = require('../models/documnentModel');


module.exports.addDocument = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(200).json({ message: 'All mandatory fields required.', success: false });
        }

        let fileExtension = req.file.mimetype.split('/')[1];
        let fileSizeKB = req.file.size / 1024;

        const newDocument = new Document({
            document: req.file.originalname,
            title,
            description,
            file_size: fileSizeKB.toFixed(2) + ' KB',
            file_format: fileExtension
        });
        await newDocument.save();
        res.status(201).json({ message: 'Document added.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json({ message: 'Documents list.', data: documents, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.deleteDocument = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(200).json({ message: 'Document id not found.', success: false });
        }
        const data = await Document.findByIdAndDelete(_id);
        if (!data) {
            return res.status(404).json({ message: 'Document not found. Please check payload id.', success: false });
        }
        res.status(200).json({ message: 'Document deleted.', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.', success: false });
    }
}