const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const serverName = process.env.DB_SERVER_URL || 'http://localhost:3000';
const serverUrl = serverName.startsWith('http') ? serverName : `http://${serverName}:3000`;

// Define the "host my portfolio" route
app.get('/portfolio/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${serverUrl}/resumes/${id}`);
    const data = response.data;
    console.log(data);
    res.render("portfolio", {
      name: data.name,
      img_url: data.img_url,
      bio: data.bio,
      company: data.company,
      username: data.login,
      twitter_username: data.twitter_username,
      email: data.email,
      blog: data.blog,
      location: data.location,
      public_repos: data.public_repos,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


// Start the server
app.listen(7000, () => {
  console.log('Server listening on port 7000');
});
