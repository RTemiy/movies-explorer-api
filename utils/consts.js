const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const CORS = [
  'http://',
  'https://',
  'http://api.',
  'https://api.',
  'http://',
  'http://localhost:3000',
  'http://localhost:3001',
];

module.exports = {
  URL_REGEXP,
  CORS,
};
