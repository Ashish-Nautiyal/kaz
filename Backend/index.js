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

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});