const express = require("express");
const router = express.Router();

const movieController = require("../Controllers/movieControllers"); // Import the controller

// API for creating a movie
router.post("/addMovie", movieController.AddMovie);

// API for fetching all movies
router.get("/getMovie", movieController.GetMovie);

// API for deleting a movie
router.post("/deleteMovie", movieController.DeleteMovie);

// API for updating a movie
router.post("/movieUpdate/:id", movieController.UpdateMovie);

module.exports = router;
