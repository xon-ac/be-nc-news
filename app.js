const express = require("express");

const { getAllTopics } = require ('./db/controllers/topics.controllers')
const { handleNotFoundError, handleServerErrors } = require('./errors');

const app = express();

app.get('/api/topics', getAllTopics)

app.use(handleServerErrors);

app.all('/*', handleNotFoundError)

module.exports = app;