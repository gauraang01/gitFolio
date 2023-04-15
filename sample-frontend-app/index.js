const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const serverName = process.env.DB_SERVER_URL || 'http://localhost:3000';
const serverUrl = serverName.startsWith('http') ? serverName : `http://${serverName}:3000`;


app.get('/', (req, res) => {
    res.send(`Hey the value passed of serverUrl is ${serverUrl}`)
});

// Route for getting all resumes
app.get('/resumes', async (req, res) => {
  try {
    const response = await axios.get(`${serverUrl}/resumes`);
    const resumes = response.data;
    res.render('resumes', { resumes });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for getting a resume by ID
app.get('/resumes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${serverUrl}/resumes/${id}`);
    const resume = response.data;
    res.render('resume', { resume });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for posting a resume
app.post('/resumes', async (req, res) => {
  try {
    const response = await axios.post(`${serverUrl}/resumes`, req.body);
    res.redirect('/resumes');
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Frontend server started on port ${port}`);
});
