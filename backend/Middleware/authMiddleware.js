// middleware/authMiddleware.js
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

module.exports = { isLoggedIn };

// The isLoggedIn middleware is executed first. If the user is authenticated (req.user exists),
// it calls next(), allowing the request to proceed to the route handler function (req, res) => {...}.
// If the user is not authenticated, it sends a "401 Unauthorized" response, and the route handler is not executed.
