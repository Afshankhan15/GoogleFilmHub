// export Utility function to handle errors and send error responses

const handleErrorResponse = (res, statusCode, message, error) => {
  if (error && error.message) {
    // If error is not null and has a 'message' property [CATCH BLOCK]
    res.status(statusCode).json({
      success: false,
      message,
      error: error.message,
    });
  } else {
    // If error is null or doesn't have a 'message' property [TRY BLOCK]
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

module.exports = handleErrorResponse;

// DEMO

// if -->  [catch]
// res.status(500).json({
//     success: false,
//     message: "Server Error",
//     error: error.message,
//   });

// else --> return res       [try]
//   .status(404) // 404 NOT FOUND -> used when server couldn't find the requested resource
//   .json({
//     success: false,
//     message: "Movie not found", // no error
//   });
