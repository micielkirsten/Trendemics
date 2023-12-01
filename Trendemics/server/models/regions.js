const { DataTypes, sequelize } = require('sequelize')
require('dotenv').config();
require('dotenv/config');

//const sequelize = new Sequelize('UF CISE Oracle', DB_USER, DB_PW, {
//  host: 'oracle.cise.ufl.edu:1521',
//  dialect: 'orcl',
//});

const Region = sequelize.define('Region', {
  ID: {
    type: DataTypes.STRING, // Represents a string
    primaryKey: true,
  },
  Location: {
    type: DataTypes.STRING, // Represents a string
  },
  Wikidata: {
    type: DataTypes.STRING, // Represents a string
  },
  Aggregation: {
    type: DataTypes.INTEGER, // Represents an integer
  }
}, {
  timestamps: false, // Set to false if you don't want timestamps (created_at, updated_at)
  tableName: 'REGIONS' // Replace 'regions' with your actual table name in the database
});

module.exports = Region;
