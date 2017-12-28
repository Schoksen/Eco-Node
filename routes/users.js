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
    password: req.body.password
  });
  User.adduser(newUser, (err, User) => {
    if (err) {
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

  User.getuserByusername(username, (err, User) => {
    if (err) throw err;
    if (!User) {
      return res.json({
        success: false,
        msg: 'user not found'
      });
    }

    User.comparePassword(password, User.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({
          data: User
        }, config.secret, {
          expiresIn: 604800
        }); //Exp 1 Week
        res.json({
          success: true,
          token: 'JWT ' + token,
          User: {
            id: User._id,
            name: User.name,
            email: User.email
          }
        });
      } else {
        return res.json({
          success: false,
          msg: 'Wrong Password'
        });
      }
    });
  });
});

//Authentication with token
const authenticate = passport.authenticate('jwt', {session: false});

//Profile
router.get('/profile', authenticate , (req, res, next) => {
  res.json({
    User: req.User
  });
});

module.exports = router;
