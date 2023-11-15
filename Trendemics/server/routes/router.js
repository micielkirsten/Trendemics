const express = require('express')
const router = express.Router()
require('../server.js')

router.get('/regions', (req, res) => {
  
  /*
  const query = 'SELECT * FROM REGIONS';

  connection.execute(query, [], { resultSet: true }, (err, result) => {
    if (err) {
      console.error(err.message);
      connection.close();
      res.status(500).send('Error executing the query');
      return;
    }
  })
*/

})

module.exports = router