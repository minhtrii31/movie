const Movie = require("../models/movieModel");
const Genre = require("../models/genreModel");
const genreController = require("../controllers/genreController");
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.findMoviesByGenreId = async (req, res) => {
  const { id } = req.params;
  try {
    const movies = await Movie.find({ genres: id });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({ _id: id });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
