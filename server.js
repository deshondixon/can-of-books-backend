'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const Book = require('./models/books.js');
const { response } = require('express');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/books', getBooks);

app.get('/', (request, response) => {
  response.status(200).send('Welcome to server!');
});

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

app.use((error, request, response) => {
  response.status(500).send(error.message);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

mongoose.connect(process.env.DB_URL);

async function getBooks(req, res, next) {
  try {
    let results = await Book.find();
    response.status(200).send(results);
  } catch (err) {
    next(err);
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
