// Success.js

const handleSuccessResponse = (res, statusCode, message, data) => {
  if (data) {
    res.status(statusCode).json({
      success: true,
      message,
      MovieData: data,
    });
  } else {
    res.status(statusCode).json({
      success: true,
      message,
    });
  }
};



module.exports = handleSuccessResponse;

//201 -> when new resource created successfully as a result of req and then send response to client (201 often used after successful POST)
// demo
// return res
//         .status(201)
//         .json({
//           success: true,
//           message: "Movie successfully created",
//           newMovie: newMovie, // data
//         });
