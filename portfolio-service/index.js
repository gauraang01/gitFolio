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
    const resume = response.data;
    res.render('portfolio.ejs', { resume });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Define the "create portfolio" route
app.post('/create-portfolio', (req, res) => {
  const { name, email, skills, /* other portfolio data */ } = req.body;
  const portfolioData = new Portfolio({
    name,
    email,
    skills,
    // Other portfolio data
    // ...
  });
  portfolioData.save((err) => {
    if (err) {
      // Handle the error
      res.status(500).send('Error creating portfolio');
    } else {
      // Redirect the user to their hosted portfolio page
      const id = portfolioData._id;
      res.redirect(`/host-portfolio/${id}`);
    }
  });
});

// Start the server
app.listen(7000, () => {
  console.log('Server listening on port 7000');
});
