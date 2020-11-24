const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const insertMovieQuery = `SELECT first_name, last_name, osha_level_id, subcontractor_job_title_id, 
  subcontractor_certifications, job_status FROM "users" WHERE access_level_id = 2;`;
  pool
    .query(insertMovieQuery)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting movies', err);
      res.sendStatus(500);
    });
});

module.exports = router;
