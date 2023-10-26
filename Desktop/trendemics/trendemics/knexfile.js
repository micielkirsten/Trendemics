require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    client: 'orcl', // Use the appropriate database client (e.g., 'oracle', 'mysql', 'postgresql', etc.)

    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    },

    migrations: {
      directory: './db/migrations', // Set the path to your migration files
    },

    seeds: {
      directory: './db/seeds', // Set the path to your seed files
    },p
  },
};
