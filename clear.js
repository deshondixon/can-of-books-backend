'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Book = require('./models/books.js');

async function clear() {
  try {
    await Book.deleteMany({});
    console.log('Books no longer in database.');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();
