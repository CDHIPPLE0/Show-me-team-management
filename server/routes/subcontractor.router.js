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
  job_title, osha_level, subcontractor_certifications, job_status, is_selected, 
  job_id FROM "user" LEFT JOIN "user_job" ON "user".id = "user_job".user_id WHERE access_level_id = 2 
  ORDER BY job_status, job_title DESC`;
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
  const queryText = `SELECT id, first_name, last_name, phone, email, address,
  job_title, osha_level, subcontractor_certifications, is_selected FROM "user" 
  WHERE access_level_id = 2 AND job_status = false ORDER BY last_name DESC;`;
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
