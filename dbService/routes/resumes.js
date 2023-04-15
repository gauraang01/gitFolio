const express = require('express');
const router = express.Router();
const Resume = require('../models/resume');

// Route for getting all resumes
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.send(resumes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for getting a resume
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).send('Resume not found');
    }
    res.send(resume);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for posting a resume
router.post('/', async (req, res) => {
  const resume = new Resume(req.body);
  try {
    const savedResume = await resume.save();
    res.send(savedResume);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
