const router = require('express').Router();
const {
  updateUserInfo, getMyself,
} = require('../controllers/users');
const { validateUser } = require('../middlewares/validation');

router.get('/me', getMyself);

router.patch('/me', validateUser, updateUserInfo);

module.exports = router;
