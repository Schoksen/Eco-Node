const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to MongoDB
mongoose.connect(config.database, {
    useMongoClient: true
  });

//On MongoDB Connection do
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
  });

//On MongoDB Connection Error do
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
  });

//Launch Express
const app = express();

//Routes for User Stuff
const users = require('./routes/users');

//Port Number
const port = 3000;

//CORS Option for callowing Domains to visit
app.use(cors());

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
  });

//Start Server
app.listen(port, () => {
    console.log('Server started on Port ' + port);
  });
