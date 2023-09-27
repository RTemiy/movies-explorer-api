const express = require('express');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

require('dotenv').config();

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');

const handleError = require('./middlewares/errors');
const corsChecker = require('./middlewares/corsChecker');

app.use(requestLogger);

mongoose.connect(require('./utils/config').dataMovies, {
  useNewUrlParser: true,
});

app.use(require('./middlewares/limiter').limiter);

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(corsChecker);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(require('./utils/config').PORT, () => {});
