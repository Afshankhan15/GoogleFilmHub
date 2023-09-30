const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv"); // Add dotenv for environment variables

dotenv.config({ path: "./Config/config.env" });

// Import the connectToDatabase function from the database configuration file
const connectToDatabase = require("./Config/database");


// Import the Passport.js configuration from the middleware folder
require('./Middleware/auth'); 

// model and route for user
const usermodel = require("./Model/User");
const user = require("./Routes/User");

// model and route for user to add movie
const usermodel2 = require("./Model/UserInfo");
const userApi = require("./Routes/UserRoutes");

const app = express();

// if you want to use json
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON data in the request body

app.use(session({ secret: process.env.SESSION_SECRET })); // Use environment variable for session secret

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 4000; // Use environment variable for port

// Call the connectToDatabase function to establish the database connection
connectToDatabase();

app.get("/auth/login", (req, res) => {
  res.send("<a href='/auth/google'>Authenticate with Google Afshan</a>");
});

//step1: when user clicks on Login button then it will redirect to this endpoint/page
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// step2: if user is authenticated means successfully logins then it will redirect to ' successRedirect' endpoint , otherwise '/auth/failure' failure enpoint
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/register", // Redirect to the register endpoint upon successful login
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", async (req, res) => {
  res.send("You are not authenticated...something went wrong");
});

app.use("/", userApi); // ROUTES --> API and model --> for usermodel2 {when user add/edit/delete movie}

app.use("/", user); //  ROUTES --> API and model --> for usermodel {when user login}

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
