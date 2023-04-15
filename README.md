# Project Name: GitHub Resume and Portfolio Generator
The GitHub Resume and Portfolio Generator is a web-based application that allows users to input their GitHub username and generate a resume and portfolio based on their GitHub profile. The application is deployed on the Napptive platform using OAM YAML files and is divided into multiple microservices.

# Services
## ResumeService
The ResumeService is the central service of the application. Users can go to this service and provide their GitHub username to generate a resume. This service is exposed to the outside world.

## dbService
The dbService provides endpoints for performing CRUD operations on the MongoDB database, which is hosted as a separate container. This service is not accessible by the outside world but can only be accessed by the rest of the services.

## MongoDB
The MongoDB is the database used by the dbService to store user data.

## Portfolio-Service
The Portfolio-Service has an endpoint URL of /portfolio/id, which fetches data from the dbService and generates a portfolio for the user. This service is accessible by the external world.

# Deployment
The application is deployed on the Napptive platform using OAM YAML files, which define the different microservices and their configurations. The services are deployed as separate containers, with the ResumeService and Portfolio-Service being exposed to the outside world.

# Representation
```
   +-----------------+       +----------------+       +---------------+
   |  External World |       |  ResumeService |       | Portfolio-Service |
   +-----------------+       +----------------+       +---------------+
            |                        |                         |
            |                        |                         |
            |    +----------+        |                         |
            +--->| GitHub   |        |                         |
                 |  API     |        |                         |
                 +----------+        |                         |
                                     |                         |
                                     |                         |
                                     |             +-----------+-----------+
                                     |             |        dbService        |
                                     |             +-----------+-----------+
                                     |                         |
                                     |                         |
                                     |             +-----------+-----------+
                                     |             |        MongoDB         |
                                     |             +-----------------------+
                                     |                                    
                                     +-------------------------------------+

```
# Technologies Used
- GitHub API
- Node.js
- Express
- MongoDB
- Napptive Platform
- OAM YAML

# How to Use
1. Go to the ResumeService URL.
2. Provide your GitHub username and click on the Generate Resume button.
3. The ResumeService will fetch data from the GitHub API and generate a resume for you.
4. Go to the Portfolio-Service URL with your generated resume ID in the URL.
5. The Portfolio-Service will fetch data from the dbService and generate a portfolio for you.

# Conclusion
The GitHub Resume and Portfolio Generator is a simple yet useful web-based application that allows users to generate their resume and portfolio based on their GitHub profile. The application is deployed on the Napptive platform using OAM YAML files, which makes it easy to manage and scale the different microservices.