
const mongoose = require('mongoose');

// BookRequest Schema
const bookRequestSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book1',
      required: true,
    },
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User1', 
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BookRequest = mongoose.model('BookRequest1', bookRequestSchema);

module.exports = BookRequest;