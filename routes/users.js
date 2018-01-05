const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    agb: req.body.agb
  });
  //Create new Entry in the Collection Users
  User.addUser(newUser, (err, newUser) => {
    if (err) {
      console.error(err);
      res.json({
        success: false,
        msg: 'Failed to register user'
      });
    } else {
      res.json({
        success: true,
        msg: 'user registered'
      });
    }
  });
});

//Authentication
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => { //Works
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      });
    } else {
      User.comparemyPassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({
            data: user
          }, config.secret, {
            expiresIn: 604800 //Exp 1 Week
          });
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            }
          });
        } else {
          return res.json({
            success: false,
            msg: 'Wrong Password'
          });
        }
      });
    };
  });
});

//Authentication with token
const authenticate = passport.authenticate('jwt', {session: false});

//Profile
router.get('/profile', authenticate, (req, res, next) => {
  res.json({success: true, user: req.user});
});

module.exports = router;
