const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "../Config/config.env" });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
      passReqToCallback: true,
    },

    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// for serialization: is called when a user is authenticated and should determine what data to store in the session (in this case, the entire user profile).
passport.serializeUser((user, done) => {
  done(null, user);
});

// for de-serialization: is called when a user makes a request, and it should retrieve the user data from the session.
passport.deserializeUser((user, done) => {
  done(null, user);
});
