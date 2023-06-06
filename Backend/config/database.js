const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('database connection success.');
}).catch((error) => {
    console.log('database connection failed.', error);
});