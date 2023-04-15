const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String]
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
