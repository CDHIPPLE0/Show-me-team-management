const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `SELECT first_name, last_name, phone, email, address,
  job_title, osha_level, subcontractor_certifications, job_status FROM "user" WHERE access_level_id = 2;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting subcontractors', err);
      res.sendStatus(500);
    });
});

module.exports = router;
