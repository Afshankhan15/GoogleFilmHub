const usermodel = require("../Model/User");

//import Error.js from Utils
const handleErrorResponse = require("../Utils/Error");

// import Success.js from Utils
const handleSuccessResponse = require("../Utils/Success");

// API TO REGISTER/LOGIN USER using OAuth (specifically, Google OAuth)
exports.register = async (req, res) => {
  // Your registration logic here
  console.log(req.user); // see the entire detail about the loggedIn User
  try {
    const googleId = req.user.id; // Extract the googleId from req.user
    console.log("ID1", req.user.id);

    const profilePicture = req.user.picture; // Assuming picture contains the profile picture URL

    // Check if a user with the same googleId already exists
    const existingUser = await usermodel.findOne({ googleId }); // Use googleId as the query parameter

    if (existingUser) {
      // if user already have an account in DB

      // Redirect to the /dash route with query parameters including profilePicture
      res.redirect(
        `http://localhost:3000/dash?googleId=${googleId}&profilePicture=${profilePicture}`
      );
      // res.send(`${req.user.displayName} successfully Logins with ${req.user.email} has ID: ${req.user.id}`)
    } else {
      // is New User , then create an account and save it in DB
      const NewUser = await usermodel.create({
        googleId: req.user.id,
        displayName: req.user.displayName,
        email: req.user.email,
        email_verified: req.user.email_verified,
        verified: req.user.verified,
        profilePicture: req.user.picture, // Add profilePicture
      });

      res.redirect("http://localhost:3000/Regpage");
      // return res.status(201).json({
      //   success: true,
      //   message: "User Created in DB",
      //   NewUser1: NewUser,
      // });

      // console.log("ADDED USER: ", NewUser);
    }
  } catch (error) {
    return handleErrorResponse(res, 500, "Server Error", error);
  }
};

// API --> TO Logout user
exports.logout = (req, res) => {
  // Your logout logic here
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      }
      // res.status(200).json({
      //   success: true,
      //   message: `You are Logged Out Successfully`,
      // });
      return handleSuccessResponse(
        res,
        200,
        "You are Logged Out Successfully",
        null
      );
    });
  });
};
