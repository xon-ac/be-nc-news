const express = require('express');
const {getTopics} = require('./db/controllers/topics.controllers')

const app = express();
app.use(express.json());

app.get('api/topics')

module.export = app