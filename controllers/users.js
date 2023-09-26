const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { Mongoose } = require('mongoose');
const User = require('../models/user');
const Error409 = require('../errors/Error409');
const Error400 = require('../errors/Error400');
const Error404 = require('../errors/Error404');

module.exports.getMyself = (req, res, next) => {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => {
      if (user) {
        return res.send(...user);
      }
      return next(new Error404('Пользователь не найден'));
    })
    .catch((err) => next(err));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return next(new Error404('Пользователь не найден'));
    })
    .catch((err) => {
      if (err instanceof Mongoose.Error.ValidationError) {
        return next(new Error400('Некорректные данные'));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => res.status(201).send({
          name, email, _id: user._id,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new Error409('Пользователь уже существует'));
          } if (err instanceof Mongoose.Error.ValidationError) {
            return next(new Error400('Некорректные данные'));
          }
          return next(err);
        });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = sign(
        { _id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((err) => next(err));
};
