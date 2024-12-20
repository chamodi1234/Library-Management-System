
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();  

// Import routes
const issuedBooksRoutes = require('./routes/issuedBooks1');
const bookRoutes = require('./routes/books1');
const userRoutes = require('./routes/userRoutes1');
const authRoutes = require('./routes/auth1');
const bookRequestRoutes = require('./routes/bookRequests1');  
const notificationRoutes = require('./routes/notificationRoutes1');



 

const app = express();


app.use(express.json());  
app.use(cors());  
app.use(helmet());  
app.use(morgan('dev'));  


app.use('/api/issuedBooks1', issuedBooksRoutes);  
app.use('/api/books1', bookRoutes);  
app.use('/api/users1', userRoutes);  
app.use('/api/auth1', authRoutes);  
app.use('/api/bookRequests1', bookRequestRoutes);  
app.use('/api/notificationRoutes1', notificationRoutes);



mongoose
  .connect(process.env.DB_URI, { })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);  
  });


app.use((err, req, res, next) => {
  console.error(err.stack);  
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Invalid data!' });
  } else {
    res.status(500).send({ message: 'Something went wrong!' });
  }
});


const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});