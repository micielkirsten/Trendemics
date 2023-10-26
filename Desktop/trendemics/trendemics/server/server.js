const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile'); // Create a knexfile.js with your database configuration

const app = express();
const port = process.env.PORT || 5000;

// Database setup
const db = knex(knexConfig.development);

// Middleware
app.use(express.json());

// Database migration (you should have your migration files set up)
db.migrate
  .latest()
  .then(() => {
    console.log('Database migration successful');
  })
  .catch((err) => {
    console.error('Error running database migration:', err);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Your API routes can be defined in separate route files and imported here
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});