const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ // Regular expression for email validation
  },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['bochur', 'girl', 'shliach'],  // Role can only be one of these values
    required: true 
  },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  referenceName: { type: String, required: true },
  referenceContact: { type: String, required: true },
});

// Create the model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model so it can be used in other files
module.exports = User;
