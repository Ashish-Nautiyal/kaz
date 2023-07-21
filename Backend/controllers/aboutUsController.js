const AboutUs = require('../models/aboutUsModel');

module.exports.addAboutUs = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(200).json({ message: 'All mandatory fields required.', success: false });
        }

        const newAboutUs = new AboutUs({
            title,
            content
        });
        await newAboutUs.save();
        res.status(201).json({ message: 'AbooutUs added.', success: true });
    } catch (error) {
        console.log(error);
       return res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.getAboutUs = async (req, res) => {
    try {
        const documents = await AboutUs.find();
            return res.status(200).json({ message: 'AboutUs Content.', data: documents, success: true });
    } catch (error) {
        console.log(error);
       return res.status(500).json({ message: 'Internal server error.', success: false });
    }
}

module.exports.updateAboutUs = async (req, res) => {
    try {
        const { _id, title, content } = req.body;
        if (!_id || !title || !content) {
            return res.status(200).json({ message: 'All mandatory fields required.', success: false });
        }
        await AboutUs.findByIdAndUpdate(_id, { $set: req.body });
        return res.status(200).json({ message: 'AboutUs Content Updated.', success: true });
    } catch (error) {
        console.log(error);
       return res.status(500).json({ message: 'Internal server error.', success: false });
    }
}