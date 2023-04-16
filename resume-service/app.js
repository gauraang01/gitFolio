const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// const k8s = require('@kubernetes/client-node');
// const kubeConfig = new k8s.KubeConfig();
// kubeConfig.loadFromDefault();
// const k8sApi = kubeConfig.makeApiClient(k8s.CoreV1Api);




const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

const dbServerName = process.env.DB_SERVER_URL || "http://localhost:3000";
const serverUrl = dbServerName.startsWith("http")
  ? dbServerName
  : `http://${dbServerName}:3000`;

// const portfolioServerName = process.env.PORTFOLIO_SERVER_URL || "http://localhost:7000";
// let portfolioServerUrl = "";
// if(portfolioServerName.startsWith("http")){
//   console.log("portfolioServerNamehttp", portfolioServerName);
//   portfolioServerUrl = portfolioServerName;
// }else{
//     portfolioServerUrl  = 'https://portfolio-service-7000-cgnffcjh51taq9hpjhng.apps.hackathon.napptive.dev'
// };




app.get("/", (req, res) => {
  res.render("home");
});

app.get("/githubInput", (req, res) => {
  res.render("githubInput");
});

//Github Resume and Portfolio

const accessToken = process.env.YOUR_GITHUB_ACCESS_TOKEN;

app.post("/githubData", async (req, res) => {
  const userName = req.body.username;
  const button = req.body.button;

  try {
    const { default: fetch } = await import("node-fetch");

    const githubUserData = await fetch(
      `https://api.github.com/users/${userName}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    //Name, profile picture, summary and contact details
    const data = await githubUserData.json();

    // Retrieve info about projects section
    const reposInfo = await fetch(
      `https://api.github.com/users/${userName}/repos?sort=stars&direction=desc&per_page=5`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const reposData = await reposInfo.json();
    const languagesInfo = reposData.map(async (repo) => {
      const repoLanguages = await fetch(`${repo.url}/languages`);
      const languages = await repoLanguages.json();
      return {
        ...repo,
        languages: languages,
      };
    });

    const languagesData = await Promise.all(languagesInfo);

    // Retrieve info about organizations

    const orgInfo = await fetch(
      `https://api.github.com/users/${userName}/orgs`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const orgData = await orgInfo.json();

    switch (button) {
      case "resume":
        // Generate resume page
        res.render("githubResume", {
          name: data.name,
          img_url: data.avatar_url,
          bio: data.bio,
          company: data.company,
          username: data.login,
          twitter_username: data.twitter_username,
          email: data.email,
          blog: data.blog,
          location: data.location,
          public_repos: data.public_repos,
          organizations: orgData,
          Projects: languagesData,
        });
        break;
      case "portfolio":
        // View projects page
        res.render("githubPortfolio", {
          name: data.name,
          img_url: data.avatar_url,
          bio: data.bio,
          company: data.company,
          username: data.login,
          twitter_username: data.twitter_username,
          email: data.email,
          blog: data.blog,
          location: data.location,
          public_repos: data.public_repos,
          organizations: orgData,
          Projects: languagesData,
        });
        break;
      default:
        res.send("Some error occurred, Try again!");
    }

    // res.send(data);
  } catch (error) {
    res.send("Try again!");
    console.log(error);
  }
});

// Linkedln Resume and Portfolio

// const linkedin_access_token = process.env.LINKEDIN_ACCESS_TOKEN;

// app.get("/linkedinInput", async(req,res)=>{
//     const { default: fetch } = require('node-fetch');
//     const linkedinData = await fetch('https://api.linkedin.com/v2/me', {
//         headers: {
//           'Authorization': `Bearer ${linkedin_access_token}`,
//           'cache-control': 'no-cache',
//           'X-Restli-Protocol-Version': '2.0.0'
//         }
//       });

//     const linkeData = await linkedinData.json();

//     res.send(linkeData);
// });

app.post("/resumes", async (req, res) => {
  try {
    // console.log(req.body);
    const resumeData = {
      name: req.body.name,
      img_url: req.body.image_url,
      bio: req.body.bio,
      company: req.body.company,
      username: req.body.username,
      twitter_username: req.body.twitter_username,
      email: req.body.email,
      blog: req.body.blog,
      location: req.body.location,
      public_repos: req.body.public_repos,
      // organizations: req.body.organizations,
      // Projects: req.body.Projects,
    };
    const response = await axios.post(`${serverUrl}/resumes`, resumeData);
    res.send("Resume saved successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for getting all resumes
app.get("/users", async (req, res) => {
  try {
    const response = await axios.get(`${serverUrl}/resumes`);
    let resumes = response.data;
    // resumes = resumes.map(resume => ({...resume, portfolio_url: portfolioServerUrl}));
    res.render("users", {
      resumes: resumes,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for getting a resume by ID
app.get("/gitResume/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`${serverUrl}/resumes/${id}`);
    const resume = response.data;
    res.render("gitResumeBasedOnId", {
      name: resume.name,
      bio: resume.bio,
      img_url: resume.img_url,
      company: resume.company,
      username: resume.username,
      twitter_username: resume.twitter_username,
      blog: resume.blog,
      location: resume.location,
      email: resume.email,
      public_repos: resume.public_repos,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

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

module.exports.main = app;
