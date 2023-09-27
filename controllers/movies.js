const { MongooseError } = require('mongoose');
const Movie = require('../models/movie');
const Error400 = require('../errors/Error400');
const Error404 = require('../errors/Error404');
const Error403 = require('../errors/Error403');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ movies }))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send({ movie });
    })
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        return next(new Error400('Некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  function deleteMovie() {
    Movie.findByIdAndRemove(req.params.movieId)
      .then((movie) => {
        res.send({ movie });
      })
      .catch((err) => next(err));
  }

  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new Error404('Фильм не найден'));
      } if (req.user._id === movie.owner.toString()) {
        return deleteMovie();
      }
      return next(new Error403('Недостаточно прав'));
    })
    .catch((err) => {
      if (err instanceof MongooseError.CastError) {
        return next(new Error400('Некорректные данные'));
      }
      return next(err);
    });
};
