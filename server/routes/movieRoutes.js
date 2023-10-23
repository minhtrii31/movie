const express = require("express");
const router = express.Router();
const Movie = require("../models/movieModel");
const movieController = require("../controllers/movieController");

router.get("/", movieController.getAllMovies);

router.get("/bygenre/:id", movieController.findMoviesByGenreId);

router.get("/:id", movieController.getMovieById);

module.exports = router;
