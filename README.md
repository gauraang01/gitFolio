# gitFolio 



Our web-based application is an innovative tool that makes it easy for GitHub users to create a professional **Resume** and **Portfolio** based on their GitHub profile. By simply entering their username, the application generates a visually appealing overview of their skills, achievements, and projects. Deployed on the Napptive platform, the application uses OAM YAML files and multiple microservices to ensure optimal performance and scalability.

- Resume Service link: https://resume-service-4000-cgnffcjh51taq9hpjhng.apps.hackathon.napptive.dev/
- Your portfolio link: https://portfolio-service-7000-cgnffcjh51taq9hpjhng.apps.hackathon.napptive.dev/portfolio/<ID FROM RESUME>

# Services


## resume-service
The resume-service is the central service of the application. Users can go to this service and provide their GitHub username to generate a **Resume** and **Portfolio**. This service is exposed to the outside world.

## db-service
The db-service provides endpoints for performing CRUD operations on the MongoDB database, which is hosted as a separate container. This service is not accessible by the outside world but can only be accessed by the rest of the services.

## MongoDB
The MongoDB is the database used by the dbService to store user data.

## portfolio-service
The portfolio-service has an endpoint URL of /portfolio/id, which fetches data from the db-service and generates a portfolio for the user. This service is accessible by the external world.


# Deployment
The application is deployed on the **Napptive platform** using OAM YAML files, which define the different microservices and their configurations. The services are deployed as separate containers, with the **resume-service** and **portfolio-service** being exposed to the outside world.

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



# Screenshots 


![r1](https://user-images.githubusercontent.com/108334168/232288153-209a3e2a-a7ec-44cd-b8a6-76144827855d.png)


![r2](https://user-images.githubusercontent.com/108334168/232288178-eab5ba54-979c-4056-827c-4407050a1ce9.png)


![r3](https://user-images.githubusercontent.com/108334168/232288188-e0854684-39f4-466e-96de-a8b6fa76b972.png)


![r4](https://user-images.githubusercontent.com/108334168/232288206-36d31045-b84c-4d9e-b196-849ec88c336a.png)


![r5](https://user-images.githubusercontent.com/108334168/232288210-ec5991ea-291b-4105-99ec-12a9b8c9263f.png)


# How to Use
1. Go to the ResumeService URL.
2. Provide your GitHub username and click on the Generate Resume button.
3. The ResumeService will fetch data from the GitHub API and generate a **Resume** and **Portfolio** for you.
4. Go to the Portfolio-Service URL with your generated resume ID in the URL.
5. The Portfolio-Service will fetch data from the dbService and generate a **Portfolio** for you which is stored in your database.


# How it Works
Our web application offers a seamless user experience that allows users to easily create a professional **Resume** and **Portfolio** based on their GitHub profile. To get started, users can click on the GitHub icon on the homepage and enter their GitHub username. From there, they can choose to generate either a resume or portfolio by clicking on the corresponding button.

Once the user generates their resume or portfolio, they can easily download the resume in PDF format or save it for future use. This feature ensures that users have quick and easy access to their professional documents.

In addition to generating resumes and portfolios, our web application also includes a "Check Others" feature. This feature allows users to view the saved resumes and portfolios of other users by clicking on the resume or portfolio icon of the desired person. This feature promotes collaboration and networking, as users can easily connect with other professionals in their field.

Overall, our web application provides users with a convenient and efficient way to showcase their skills and accomplishments to potential employers, while also fostering connections and collaboration within the community.


# Conclusion
In conclusion, the **gitFolio** is a powerful tool that offers an efficient and convenient way for GitHub users to showcase their skills and accomplishments. The web-based application is designed with a user-friendly interface that allows users to generate their professional documents with just a few clicks.

With the application deployed on the **Napptive platform** using **OAM YAML files**, it ensures optimal performance and scalability of the different microservices. The use of microservices ensures that each function of the application is handled by a dedicated service, making the application efficient and easy to manage.

Overall, the **gitFolio** is a valuable resource for anyone looking to highlight their skills and achievements in a professional setting. With its user-friendly interface and efficient performance, the application is a great tool for job seekers, freelancers, and other professionals looking to enhance their online presence.
