const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../Middleware/authMiddleware"); // Import the middleware

const userController = require("../Controllers/userControllers"); // Import the controller

// if user successfully logged in then it will redirect to this endpoint
// middleware === {isLoggedIn is executed} and IF user is authenticated  then it pass control to next,
// app.get("/protected", isLoggedIn, (req, res) => { // here next means that it will execute what exist inside in API
//   res.send(`${req.user.displayName} successfully Logins with ${req.user.email} has ID: ${req.user.id}`)
// });

// API --> TO Register and login user using OAuth
router.get("/register", isLoggedIn, userController.register);

// API --> TO Logout user
router.get("/logout", userController.logout);

module.exports = router;
