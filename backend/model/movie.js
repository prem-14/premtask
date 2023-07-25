const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  backdrop_path: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
