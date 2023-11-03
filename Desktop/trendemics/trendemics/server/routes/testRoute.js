// server/routes/testRoute.js

const express = require('express');
const router = express.Router();

// Define a simple test API endpoint
router.get('/testRoute', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

module.exports = router;
