const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const accessToken = process.env.YOUR_GITHUB_ACCESS_TOKEN;


app.get("/",(req,res)=>{
    res.render("home");
});


//Github Resume and Portfolio

app.get("/githubInput", async(req,res)=>{
    
    const userName = "kunal-kushwaha";
    try{
        const {default:fetch} = await import("node-fetch");

        const githubUserData = await fetch(`https://api.github.com/users/${userName}`,{
            headers : {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        //Name, profile picture, summary and contact details
        const data = await githubUserData.json();

        // Retrieve info about projects section
        const reposInfo = await fetch(`https://api.github.com/users/${userName}/repos?sort=stars&direction=desc&per_page=5`,{
            headers : {
                Authorization: `Bearer ${accessToken}`,
            }, 
        });

        const reposData = await reposInfo.json();

        const languagesInfo = reposData.map(async (repo)=>{
            const repoLanguages = await fetch(`${repo.url}/languages`);
            const languages = await repoLanguages.json();
            return{
                ...repo,
                languages: languages,
            }
        });

        const languagesData = await Promise.all(languagesInfo);

        // Retrieve info about organizations
        
        const orgInfo = await fetch(`https://api.github.com/users/${userName}/orgs`,{
            headers : {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const orgData = await orgInfo.json();

        

        res.render("githubResume",{
            name:data.name,
            img_url:data.avatar_url,
            bio:data.bio,
            company:data.company,
            username:data.login,
            twitter_username: data.twitter_username,
            email: data.email,
            blog:data.blog,
            location: data.location,
            public_repos: data.public_repos,
            organizations: orgData,
            Projects:languagesData,
        });
        // res.send(data);

    } catch(error){
        res.send("Try again!");
        console.log(error);
    }
});

                                                                                                                                                                                 

module.exports.main = app;