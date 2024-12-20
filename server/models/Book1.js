
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    uniqueId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    availableCopies: { type: Number, required: true, min: 0, default: 1 },
    publisher: { type: String },
    publicationYear: { type: Number, min: 0 },
  },
  { timestamps: true } 
);


bookSchema.index({ title: 1, author: 1, genre: 1 });


bookSchema.virtual('inStock').get(function () {
  return this.availableCopies > 0;
});

bookSchema.methods.decrementCopies = async function () {
  if (this.availableCopies > 0) {
    this.availableCopies -= 1;
    await this.save();
  } else {
    throw new Error('No copies available');
  }
};

module.exports = mongoose.model('Book1', bookSchema);