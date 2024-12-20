
const mongoose = require('mongoose');

const issuedBookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User1', 
    required: true
  },
  title: { 
    type: String, 
    required: true 
  },
  dueDate: { 
    type: Date, 
    required: true 
  },
  issuedDate: { 
    type: Date, 
    default: Date.now 
  },
  returned: { 
    type: Boolean, 
    default: false 
  },
  returnDate: { 
    type: Date 
  }  
});

module.exports = mongoose.model('IssuedBook1', issuedBookSchema);