const express = require("express");
const router = express.Router();

const usermodel2 = require("../Model/UserInfo");

// API --> TO CREATE MOVIE
router.post("/addMovie", async (req, res) => {
  console.log(req.body);
  const { googleId, moviename, image } = req.body;

  try {
    const MovieExists = await usermodel2.findOne({ moviename });

    if (MovieExists) {
      return res
        .status(400) // status(400) indicates a client error, often due to bad req
        .json({
          success: false,
          message: "Movie already exists",
        });
    } else {
      const newMovie = await usermodel2.create({ googleId, moviename, image });
      return res
        .status(201) //201 -> when new resource created successfully as a result of req and then send response to client (201 often used after successful POST)
        .json({
          success: true,
          message: "Movie successfully created",
          newMovie: newMovie,
        });
    }
  } catch (error) {
    // console.error(error); // Log the error for debugging purposes
    // res.status(500).json({ success: false, message: error.message }); this is also correct
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    }); // we don't need return in catch block --> 500 indicates a SERVER error
  }
});

// to FETCH movie
router.get("/getMovie", async (req, res) => {
  const googleId = req.query.googleId; // Extract googleId from query parameters

  // console.log("Received googleId:", googleId);

  try {
    const AllMovie = await usermodel2.find({ googleId }); // Use find to find all matching documents

    // console.log("Found user data:", AllMovie);
    if (AllMovie.length === 0) {
      // IF AllMovie is an empty array to determine if no movies were found
      return res
        .status(404) // 404 NOT FOUND -> used when server couldn't find the requested resource
        .json({
          success: false,
          message: "Movie not found",
        });
    }

    res.status(200).json({
      success: true,
      message: "User valid",
      ALLMOVIE: AllMovie,
    }); // 200 --> USED afetr successful GET REQUESTS
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// API --> TO DELETE MOVIE
router.post("/deleteMovie", async (req, res) => {
  const googleId = req.query.googleId; // Extract googleId from query parameters
  const { id } = req.body;
  try {
    if (!googleId) {
      return res.status(400).json({
        success: false,
        message: "googleId is required",
      });
    }
    const DeleteMovie = await usermodel2.findByIdAndDelete(id); // Delete the Movie by _id
    const AllMovie = await usermodel2.find({ googleId }); // Use find to find all matching documents

    if (!DeleteMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      DeletedMovie: DeleteMovie,
      ALLMOVIED: AllMovie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// API --> TO UPDATE MOVIE
router.post("/movieUpdate/:id", async (req, res) => {
  const { id } = req.params; // Receive id from the URL

  const googleId = req.query.googleId; // Extract googleId from query parameters

  const { moviename } = req.body;

  try {
    // Check if the movie with the given ID belongs to the authenticated user
    const MovieToUpdate = await usermodel2.findOne({ _id: id, googleId }); // Find the movie by ID and Google ID

    if (!MovieToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Movie not found or does not belong to the user",
      });
    }

    // Update the moviename
    MovieToUpdate.moviename = moviename; // modify name
    const updatedMovie = await MovieToUpdate.save();

    // Fetch ALL user Movie info belonging to the googleId
    const MovieInfoData = await usermodel2.find({ googleId });

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      UserData: MovieInfoData,
      UpdatedMovie: updatedMovie,
    });
  } catch (error) {
    console.log("Error in server", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
