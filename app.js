
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const express = require('express');
const config = require('./config/database');
const users = require('./routes/users');

//Connect to MongoDB
mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database ' + config.database);
});

//Launch Express
const port = config.nodeport;
const app = express();

//CORS Option for allowing Domains to visit
app.use(cors());

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Users Module, Route to Users
app.use('/users', users);

//Index Route, no Access allowed
app.get('/', (req, res) => {res.send('Invalid Endpoint');});

//Start Server
app.listen(port, () => {console.log('Server started on Port ' + port);});
