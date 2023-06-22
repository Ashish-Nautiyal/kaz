require('dotenv').config();
require('./config/database');
const express = require('express');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const port = process.env.PORT;
const app = express();
const directory = path.join(__dirname, 'public');

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use('/public', express.static(directory));
app.use(express.json());
app.use(cors());

//Admin routes
const adminRoutes = require('./routes/adminRoute');
app.use('/api', adminRoutes);

//User routes
const userRoutes = require('./routes/userRoute');
app.use('/api', userRoutes);

//Category routes
const categoryRoutes = require('./routes/categoryRoute');
app.use('/api', categoryRoutes);

//Blog routes
const blogRoutes = require('./routes/blogRoute');
app.use('/api', blogRoutes);

//Product routes
const productRoutes = require('./routes/productRoute');
app.use('/api', productRoutes);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});