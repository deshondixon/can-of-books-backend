'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/books');
mongoose.connect(process.env.DB_URL);

async function seed() {
  const myBook = new Book({
    title: 'Lord of The Rings',
    description: 'An epic saga that takes place in the past.',
    status: false,
  });

  myBook.save(function (err) {
    if (err) console.error(err);
    else console.log('first book added');
  });

  await Book.create({
    title: 'Hatchet',
    description:
      'Brian is stranded in woods and must survive with only a Hatchet.',
    status: true,
  });
  console.log('second book added');


  await Book.create({
    title: 'Flat Stanley',
    description:
      'A kid that can turn flat and even be sent in the mail and go under doors.',
    status: true,
  });
  console.log('third book added');

  await Book.create({
    title: 'Where the Wild Things Are',
    description:
      'A story about a boy named Max who takes a journey into his imagination.',
    status: true,
  });
  console.log('fourth book added');

  console.log('Books added to the database.');

  mongoose.disconnect();
}

seed();
