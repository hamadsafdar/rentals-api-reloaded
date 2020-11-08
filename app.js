const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
require('./src/database/initiate');

//routes

const userRoutes = require('./src/routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

//
app.use('/api/user', userRoutes);

module.exports = app;
