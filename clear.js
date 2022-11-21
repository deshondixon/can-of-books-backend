const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL);

const Book = require('./models/books.js');

async function clear() {
  try {
    await Book.deleteMany({});
    console.log('Books cleared');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();
