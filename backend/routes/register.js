const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// @route POST /api/auth/register
// @desc Register a new user
router.post('/', async (req, res) => {
  const { email, password, role, fullName, phoneNumber, referenceName, referenceContact } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      fullName,
      phoneNumber,
      referenceName,
      referenceContact,
    });

    // Save the user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({
      message: 'User registered successfully',
      role: newUser.role, // Return the role after registration
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
