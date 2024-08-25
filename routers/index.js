const express = require('express');
const app = express();
const BASE_PATH = "V1";

const employeeRouter = require('./employeeRouter');

app.use(`/${BASE_PATH}/employee`, employeeRouter);

module.exports = app;
