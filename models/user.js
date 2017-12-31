const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const mongooseUniqueValidator = require('mongoose-unique-validator');

//User Schema, how Data is stored in the Collection
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true,
        unique: true,
      },
    username: {
        type: String,
        required: true
      },
    password: {
        type: String,
        required: true
      }
  });

//Plugin for unique to work
userSchema.plugin(mongooseUniqueValidator);

//Export User as a new Database
const User = module.exports = mongoose.model('User', userSchema);

//Search for User by ID
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
  };

//Search for User by Username
module.exports.getUserByUsername = function(username, callback)  {
    const query = {username: username};
    User.findOne(query, callback);
  };

//Save new User to the Database encrypted!
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
          });
      });
  };

//Match Password?
module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
};
