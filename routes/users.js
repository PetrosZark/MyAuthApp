const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// Middleware to check authentication
function authenticateUser(req, res, next) {
  if (!req.session || !req.session.token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

// Protected route to get user info
router.get('/user', authenticateUser, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email || "No email provided"
  });
});

module.exports = router;
