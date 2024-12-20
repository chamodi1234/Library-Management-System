
const express = require('express');
const router = express.Router();
const User = require('../models/User1');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  



router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).send({ error: 'User does not exist.' });
  }

  
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return res.status(400).send({ error: 'Invalid credentials.' });
  }


  const token = jwt.sign(
    { email: existingUser.email, role: existingUser.role },
    'your_jwt_secret', 
    { expiresIn: '1h' }  
  );

  res.send({
    token,
    email: existingUser.email,
    role: existingUser.role,
  });
});


router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

 
  if (!name || !email || !password || !role) {
    return res.status(400).send({ error: 'All fields are required.' });
  }

 
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ error: 'User already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  const newUser = new User({ name, email, password: hashedPassword, role });

  try {
    await newUser.save();
    res.send({ message: 'Registration successful!' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to register. Please try again!' });
  }
});

module.exports = router;