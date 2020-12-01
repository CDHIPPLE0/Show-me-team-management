const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.delete('/deleteSubcontractor/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "user" WHERE id=$1;`;
  const queryArray = [req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.get('/', rejectUnauthenticated, (req, res) => {
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

router.get('/available', rejectUnauthenticated, (req, res) => {
  console.log('made it to router');
  const queryText = `SELECT first_name, last_name, phone, email, address,
  job_title, osha_level, subcontractor_certifications FROM "user" WHERE access_level_id = 2 AND job_status = false;`;
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
