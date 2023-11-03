
/*
const express = require('express');
const oracledb = require('oracledb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
//const PORT = process.env.PORT || 5000;

// Define the Oracle database connection pool
oracledb.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
  poolMax: 4,
  poolMin: 1,
  poolIncrement: 1,
  poolTimeout: 0
})
  .then(() => {
    console.log('Connected to Oracle database');
  })
  .catch((err) => {
    console.error('Error connecting to Oracle database:', err);
  });

// Define your API routes and middleware here

app.use('http://localhost:5000/', testRoute);

app.get('/someEndpoint', (req, res) => {
  // Your API logic here
  res.json({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



/*
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
*/

const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');

// Set up Oracle database connection
//oracledb.initOracleClient({ libDir: 'path/to/your/oracle/instantclient' });

// Configure your Oracle database connection details
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

// Route to retrieve data from the database
router.get('/get-data', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const sql = 'SELECT * FROM REGIONS';
    const result = await connection.execute(sql);

    // Process and return the data
    res.json(result.rows);

    await connection.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
