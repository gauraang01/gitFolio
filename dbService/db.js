const mongoose = require('mongoose');

// Connect to MongoDB database
const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const endpoint = 'mongodb:27017'; // change this to the actual endpoint of your MongoDB container

const databaseName = 'myDatabase';
const uri = `mongodb://${username}:${password}@${endpoint}/${databaseName}`;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db;
