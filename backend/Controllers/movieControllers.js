const usermodel2 = require("../Model/UserInfo");

//import Error.js from Utils
const handleErrorResponse = require("../Utils/Error");

// import Success.js from Utils
const handleSuccessResponse = require("../Utils/Success");

// API for creating a movie
exports.AddMovie = async (req, res) => {
  console.log(req.body);
  const { googleId, moviename, image } = req.body;

  try {
    const MovieExists = await usermodel2.findOne({ moviename, googleId }); // find movie associated with user's GoogleId

    if (MovieExists) {
      // status(400) indicates a client error, often due to bad req
      return handleErrorResponse(res, 400, "Movie already exists", null);
    } else {
      const newMovie = await usermodel2.create({ googleId, moviename, image });
      // 201 -> when new resource created successfully
      return handleSuccessResponse(
        res,
        201,
        "Movie successfully created",
        newMovie
      );
    }
  } catch (error) {
    // console.error(error); // Log the error for debugging purposes
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};

// API for fetching all movies
exports.GetMovie = async (req, res) => {
  const googleId = req.query.googleId; // Extract googleId from query parameters

  // console.log("Received googleId:", googleId);

  try {
    const AllMovie = await usermodel2.find({ googleId }); // Use find to find all matching documents

    // console.log("Found user data:", AllMovie);
    if (AllMovie.length === 0) {
      // IF AllMovie is an empty array to determine if no movies were found
      return handleErrorResponse(res, 404, "Sorry, Movie not found", null); // pass error as null in try block
    }

    // 200 --> USED afetr successful GET REQUESTS
    return handleSuccessResponse(res, 200, "User valid", AllMovie);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};

// API for deleting a movie
exports.DeleteMovie = async (req, res) => {
  const googleId = req.query.googleId; // Extract googleId from query parameters
  const { id } = req.body;
  try {
    if (!googleId) {
      return handleErrorResponse(res, 400, "googleId is required", null);
    }
    const DeleteMovie = await usermodel2.findByIdAndDelete(id); // Delete the Movie by _id
    const AllMovie = await usermodel2.find({ googleId }); // Use find to find all matching documents

    if (!DeleteMovie) {
      return handleErrorResponse(res, 404, "Movie not found", null);
    }

    return handleSuccessResponse(
      res,
      200,
      "Movie deleted successfully",
      AllMovie
    );
  } catch (error) {
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};

// API for updating a movie
exports.UpdateMovie = async (req, res) => {
  const { id } = req.params; // Receive id from the URL

  const googleId = req.query.googleId; // Extract googleId from query parameters

  const { moviename } = req.body;

  try {
    // Check if the movie with the given ID belongs to the authenticated user
    const MovieToUpdate = await usermodel2.findOne({ _id: id, googleId }); // Find the movie by ID and Google ID

    if (!MovieToUpdate) {
      return handleErrorResponse(
        res,
        404,
        "Movie not found or does not belong to the user",
        null
      ); // pass null as error [try block]
    }

    // Update the moviename
    MovieToUpdate.moviename = moviename; // modify name
    const updatedMovie = await MovieToUpdate.save();

    // Fetch ALL user Movie info belonging to the googleId
    const MovieInfoData = await usermodel2.find({ googleId });

    // res.status(200).json({
    //   success: true,
    //   message: "Movie updated successfully",
    //   UserData: MovieInfoData,
    //   UpdatedMovie: updatedMovie,
    // });
    return handleSuccessResponse(
      res,
      200,
      "Movie updated successfully",
      MovieInfoData
    );
  } catch (error) {
    console.log("Error in server", err);
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};
