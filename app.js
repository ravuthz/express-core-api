const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const crud = require("./sequelize/crud");
const models = require("./sequelize/models");

const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use("/api/users", crud(models.User));

module.exports = app;
