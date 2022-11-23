'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const Book = require('./models/books.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongoose is connected to the database >:D');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/books', getBooks);
app.post('/books', postBooks);
app.put('/books/:id', putBooks);
app.delete('/books/:id', deleteBooks);

app.get('/', (request, response) => {
  response.status(200).send('Welcome to the Deshon and Don server!');
});

app.get('*', (request, response) => {
  response.status(404).send('im not available anymore <:(');
});

app.use((error, request, response) => {
  response.status(500).send(error.message);
});

mongoose.connect(process.env.DB_URL);

async function getBooks(request, response, next) {
  try {
    let results = await Book.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function postBooks(request, response, next) {
  try {
    console.log(request.body);
    let createdBook = await Book.create(request.body);
    console.log(createdBook);
    response.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
}

async function putBooks(request, response, next) {
  try {
    let id = request.params.id;
    let updatedBookData = request.body;
    let updatedBook = await Book.findByIdAndUpdate(id, updatedBookData, {
      new: true,
      overwrites: true,
    });
    response.status(200).send(updatedBook);
  } catch (error) {
    next(error);
  }
}

async function deleteBooks(request, response, next) {
  try {
    console.log(request.params.id);
    await Book.findByIdAndDelete(request.params.id);
    response.status(200).send('book is gone forever <:O');
  } catch (error) {
    next(error);
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
