const mongoose = require('mongoose');
const checkEmail = require('validator/lib/isEmail');
const { compare } = require('bcrypt');
const Error401 = require('../errors/Error401');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => { checkEmail(email); },
      message: 'Некорректный E-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new Error401('Неправильные почта или пароль'));
    }
    return compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new Error401('Неправильные почта или пароль'));
        }
        return user;
      });
  });
};

module.exports = mongoose.model('user', userSchema);
