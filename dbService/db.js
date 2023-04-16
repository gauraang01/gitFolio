const mongoose = require('mongoose');

// Connect to MongoDB database
const endpoint = 'mongodb'; // get the actual endpoint of your MongoDB container from OAM yaml
const port = '27017';
const databaseName = 'admin';
// const username = process.env.MONGO_INITDB_ROOT_USERNAME // change this to your MongoDB username
// const password = process.env.MONGO_INITDB_ROOT_PASSWORD; // change this to your MongoDB password

// const uri = `mongodb://${username}:${password}@${endpoint}:${port}/${databaseName}`;

const uri = "mongodb://localhost:27017/jkresumeDB";

console.log('Connecting to MongoDB database...' + uri);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db;