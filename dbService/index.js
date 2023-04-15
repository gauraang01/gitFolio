const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Import MongoDB connection
const { db } = require('./db');

// Import resume-related routes
const resumesRoutes = require('./routes/resumes');

// Use resume-related routes
app.use('/resumes', resumesRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
