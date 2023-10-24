const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const CORS = [
  'http://62.84.114.31',
  'https://62.84.114.31',
  'http://api.rtemiysdiploma.nomoredomainsrocks.ru',
  'https://api.rtemiysdiploma.nomoredomainsrocks.ru',
  'http://rtemiysdiploma.nomoredomainsrocks.ru',
  'https://rtemiysdiploma.nomoredomainsrocks.ru',
  'http://localhost:3000',
  'http://localhost:3001',
];

module.exports = {
  URL_REGEXP,
  CORS,
};
