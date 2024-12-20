const express = require('express');
const router = express.Router();
const BookRequest = require('../models/BookRequest1'); 
const User = require('../models/User1'); 
const Book = require('../models/Book1'); 


router.post('/', async (req, res) => {
  try {
    const { bookId, userEmail, message } = req.body;

  
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

 
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(400).json({ message: 'Book not found.' });
    }

   
    const bookRequest = new BookRequest({
      bookId,
      name: user._id, 
      message,
    });

   
    await bookRequest.save();
    res.status(201).json({ message: 'Book request created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating book request', error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
   
    const bookRequests = await BookRequest.find().populate('name').populate('bookId');
    res.status(200).json(bookRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching book requests', error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

 
    const updatedRequest = await BookRequest.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Book request not found.' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating book request', error: error.message });
  }
});


router.post('/notificationRoutes1', async (req, res) => {
  try {
    const { userEmail, receivedEmail, message } = req.body;

   
    if (!userEmail || !receivedEmail || !message) {
      return res.status(400).json({ message: 'Missing required fields: userEmail, receivedEmail, or message.' });
    }

    
    console.log(`Sending notification from ${userEmail} to ${receivedEmail} with message: ${message}`);

    res.status(200).json({ message: 'Notification sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending notification', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
   
      const deletedRequest = await BookRequest.findByIdAndDelete(id);
  
      if (!deletedRequest) {
        return res.status(404).json({ message: 'Book request not found.' });
      }
  
      res.status(200).json({ message: 'Book request deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting book request', error: error.message });
    }
  });
  

module.exports = router;
