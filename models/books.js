'use strict';






const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema ({



});


const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
