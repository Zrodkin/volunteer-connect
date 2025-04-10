const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Assuming you have a User model
const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  const { email, password, role, fullName, phoneNumber, referenceName, referenceContact } = req.body;

  if (!email || !password || !role || !fullName || !phoneNumber || !referenceName || !referenceContact) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      fullName,
      phoneNumber,
      referenceName,
      referenceContact
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  // Send the role and userId along with the message on successful login
  res.status(200).json({ message: "Login successful", role: user.role, userId: user._id });
});

module.exports = router;
