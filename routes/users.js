const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUserInfo, getMyself,
} = require('../controllers/users');

const { URL_REGEXP } = require('../utils/consts');

router.get('/me', getMyself);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(URL_REGEXP).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);

module.exports = router;
