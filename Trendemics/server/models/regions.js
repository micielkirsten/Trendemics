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
  tableName: 'regions' // Replace 'regions' with your actual table name in the database
});

module.exports = Region;
