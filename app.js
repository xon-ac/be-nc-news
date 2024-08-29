const express = require("express");
const { getApiEndpoints } = require ('./db/controllers/api.controllers')
const { getAllTopics } = require ('./db/controllers/topics.controllers')
const { getArticleById, getArticleComments, addCommentToArticle, patchArticleVotes} = require ('./db/controllers/articles.controllers')
const { deleteCommentById } = require ('./db/controllers/comments.controller')
const { handleNotFoundError, handleServerErrors } = require('./errors');
const { insertComment } = require("./db/models/articles.models");

const app = express();

app.use(express.json());

app.get('/api', getApiEndpoints);
app.get('/api/topics', getAllTopics)
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles/:article_id/comments', getArticleComments)

app.post('/api/articles/:article_id/comments', addCommentToArticle)

app.patch('/api/articles/:article_id', patchArticleVotes);

app.delete('/api/comments/:comment_id', deleteCommentById);

app.use(handleServerErrors);

app.all('/*', handleNotFoundError)

module.exports = app;