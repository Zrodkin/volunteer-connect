const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // For handling CORS
const authRoutes = require('./routes/auth'); // Import the auth routes (already includes register)

dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(cors());  // This enables CORS for all requests
app.use(express.json()); // This allows us to parse JSON bodies from requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error", err));

// Set up routes
app.use('/api/auth', authRoutes);  // Use auth routes from the auth.js file

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
