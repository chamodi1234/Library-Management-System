const express = require('express');
const Notification = require('../models/Notification1');
const router = express.Router();


const sendNotification = (email, message) => {
  try {
    if (!email) {
      console.error('Email is required to send a notification.');
      return;
    }
    
    console.log(`Notification sent to ${email}: ${message}`);
  } catch (err) {
    console.error('Error sending notification:', err.message);
  }
};


router.post('/', async (req, res) => {
  const { userEmail, receivedEmail, message } = req.body;

  
  if (!userEmail || !receivedEmail || !message) {
    return res
      .status(400)
      .json({ error: 'Sender email, recipient email, and message are required' });
  }

  try {
    
    sendNotification(receivedEmail, message);

    
    const newNotification = new Notification({
      userEmail,
      receivedEmail,
      message,
    });

    await newNotification.save();
    res.status(201).json({ message: 'Notification sent successfully.' });
  } catch (err) {
    console.error('Error creating notification:', err.message);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

router.get('/:email', async (req, res) => {
    const { email } = req.params;
    console.log('Received email:', email); 
    try {
      const notifications = await Notification.find({ receivedEmail: email });
      if (notifications.length === 0) {
        return res.status(200).json([]); 
      }
      res.json(notifications);
    } catch (err) {
      console.error('Error fetching notifications:', err.message);
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  });
  

module.exports = router;
