require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

/**
 * @description Create new user
 * @param {String} email
 * @param {String} password
 * @returns {JSON}
 */
const signUp = (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(422).json({success: false, message: 'Email already taken'});
      } else {
        bcrypt.hash(req.body.password, 12, (err, hash) => {
          if (err) {
            res.status(500).json({success: false, error: err});
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: req.body.password
            });

            user.save()
              .then(result => {
                res.status(201).json({
                  success: true,
                  message: 'User created'
                });
              })
              .catch(err => {
                console.error(chalk.black.bgRed(err));
                res.status(500).json({success: false, error: err.message});
              });
          }
        });
      }
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({success: false, error: err.message});
    });
};

/**
 * @description Logs the user, issue an JWT
 * @param {String} email
 * @param {String} password
 * @returns {JSON}
 */
const login = (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          success: false,
          message: 'Auth failed, email don\'t exist in DB'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: 'Auth failed, please enter the correct password'
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
          );
          return res.status(200).json({
            success: true,
            message: 'Auth successful',
            token: token
          });
        }
        res.status(401).json({
          success: false,
          message: 'Auth failed, please check your email and/or password'
        });
      });
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({success: false, error: err.message});
    });
};

/**
 * @description Find user by userId and delete it
 * @param {String} userId
 * @returns {JSON}
 */
const remove = (req, res, next) => {
  User.deleteOne({_id: req.params.userId})
    .exec()
    .then(() => {
      return res.status(200).json({success: true, message: 'User deleted'});
    })
    .catch(err => {
      console.error(chalk.black.bgRed(err));
      res.status(500).json({success: false, error: err.message});
    });
};

module.exports = {
  signUp,
  login,
  remove
};
