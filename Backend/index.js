require('dotenv').config();
require('./config/database');
const express = require('express');
const cors = require('cors');

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

//User routes
const userRoutes = require('./routes/userRoute');
app.use('/api', userRoutes);

//Category routes
const categoryRoutes = require('./routes/categoryRoute');
app.use('/api', categoryRoutes);

//Blog routes
const blogRoutes = require('./routes/blogRoute');
app.use('/api', blogRoutes);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});