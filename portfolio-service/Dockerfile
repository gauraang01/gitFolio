# Base image
FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Set environment variables
ENV DB_SERVER_URL=http://localhost:3000
ENV PORT=7000

# Expose port
EXPOSE $PORT

# Start the server
CMD [ "npm", "start" ]
