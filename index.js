const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./api/routes/routes');
require('dotenv').config();

const port = process.env.PORT || 3000;
const mongoDbData = process.env.DATABASE_URL
const app = express();

app.use(express.json());
app.use('/api', routes);

mongoose.connect(mongoDbData);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database connected');
});

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
});
