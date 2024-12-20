
const express = require('express');
const Book = require('../models/Book1');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const { author, genre, title } = req.query;

    
    let filter = {};

    if (author) {
      filter.author = { $regex: author, $options: 'i' }; 
    }

    if (genre) {
      filter.genre = { $regex: genre, $options: 'i' };
    }

    if (title) {
      filter.title = { $regex: title, $options: 'i' }; 
    }

    
    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
});


router.post('/', async (req, res) => {
  const { uniqueId, title, author, genre, isbn, availableCopies, publisher, publicationYear } = req.body;


  if (!uniqueId || !title || !author || !genre || !isbn || availableCopies == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    
    const existingBook = await Book.findOne({ uniqueId });
    if (existingBook) {
      return res.status(400).json({ message: 'Book with this unique ID already exists' });
    }

    const book = new Book({ uniqueId, title, author, genre, isbn, availableCopies, publisher, publicationYear });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: 'Error adding book', error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

   
    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: 'Error updating book', error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

   
    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
});

module.exports = router;