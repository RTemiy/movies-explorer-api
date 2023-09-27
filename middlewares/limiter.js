const limiter = require('express-rate-limit')({
  windowMs: 200,
  max: 100,
  message: 'Превышено количество запросов',
});

module.exports = {
  limiter,
};
