const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: String,
  // img_url: String,
  bio: String,
  // company: String,
  // username: String,
  // twitter_username: String,
  // email: String,
  // blog: String,
  // location: String,
  // public_repos: String,
  // organizations:[
  //   {
  //     name: String,
  //     description: String,
  //   },
  // ],
  // Projects: [
  //   {
  //     name: String,
  //     description: String,
  //     url: String,
  //     languages: {
  //       lang: String,
  //     }
  //   },
  // ],  
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
