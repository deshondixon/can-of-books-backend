'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);


async function seed() {




  await Book.create({


  });



  await Book.create({


  });



  mongoose.disconnect();
}

seed();
