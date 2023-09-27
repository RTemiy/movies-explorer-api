const {
  dataMovies = 'mongodb://127.0.0.1:27017/moviesdb',
  PORT = 3000,
  JWT_SECRET = 'secret-key',
  NODE_ENV,
} = process.env;

module.exports = {
  dataMovies,
  PORT,
  JWT_SECRET,
  NODE_ENV,
};
