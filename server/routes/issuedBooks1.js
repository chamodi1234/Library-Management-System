
const express = require('express');
const IssuedBook = require('../models/IssuedBook1');
const Book = require('../models/Book1'); 
const router = express.Router();

router.post('/issue', async (req, res) => {
  const { user, bookTitle, issueDate, dueDate } = req.body;

  if (!user || !bookTitle || !issueDate || !dueDate) {
    return res.status(400).json({ message: 'User ID, book title, issue date, and due date are required' });
  }

  try {
    const book = await Book.findOne({ title: bookTitle });

    if (!book) {
      return res.status(404).json({ message: 'Book not found in inventory' });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'No available copies to issue' });
    }

    
    book.availableCopies -= 1;
    await book.save();

    const newIssuedBook = new IssuedBook({
      user,
      title: bookTitle,
      issuedDate: issueDate,
      dueDate: dueDate,
      returned: false,
    });

    await newIssuedBook.save();
    res.status(201).json({ message: 'Book issued successfully', issuedBook: newIssuedBook });
  } catch (error) {
    console.error('Error issuing book:', error);
    res.status(500).json({ message: 'Server error while issuing book' });
  }
});


router.post('/return', async (req, res) => {
  const { user, bookTitle } = req.body;

  if (!user || !bookTitle) {
    return res.status(400).json({ message: 'User ID and book title are required' });
  }

  try {
    const issuedBook = await IssuedBook.findOne({ user, title: bookTitle, returned: false });

    if (!issuedBook) {
      return res.status(404).json({ message: 'Issued book not found or already returned' });
    }

    const book = await Book.findOne({ title: bookTitle });

    if (!book) {
      return res.status(404).json({ message: 'Book not found in inventory' });
    }

    
    issuedBook.returned = true;
    issuedBook.returnDate = Date.now(); 
    await issuedBook.save();

   
    book.availableCopies += 1;
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ message: 'Server error while returning book' });
  }
});


router.get('/', async (req, res) => {
  try {
    const issuedBooks = await IssuedBook.find().populate('user', 'name'); 
    res.status(200).json(issuedBooks);
  } catch (error) {
    console.error('Error fetching issued books:', error);
    res.status(500).json({ message: 'Server error while fetching issued books' });
  }
});

module.exports = router;