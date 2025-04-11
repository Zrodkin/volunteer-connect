const express = require('express');
const bcrypt = require('bcryptjs'); // Use bcryptjs for cross-platform compatibility
const User = require('../models/User');

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 */
router.post('/register', async (req, res) => {
  const {
    email,
    password,
    role,
    fullName,
    phoneNumber,
    referenceName,
    referenceContact,
  } = req.body;

  // Validate all required fields
  if (
    !email ||
    !password ||
    !role ||
    !fullName ||
    !phoneNumber ||
    !referenceName ||
    !referenceContact
  ) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      fullName,
      phoneNumber,
      referenceName,
      referenceContact,
    });

    await newUser.save();

    // Return success with role
    res.status(201).json({
      message: 'User registered successfully',
      role: newUser.role,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return role
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Return success and role info
    res.status(200).json({
      message: 'Login successful',
      role: user.role,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
