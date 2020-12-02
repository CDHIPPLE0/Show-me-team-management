const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
  const job = req.body.job;
  const user = req.body.user;
  const queryText = `INSERT INTO "user_job" (job_id, user_id) 
  VALUES ($1, $2)`;
  pool
    .query(queryText, [job, user])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Adding user to job failed: ', err);
      res.sendStatus(500);
    });
});

router.get('/active/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "user".id, first_name, last_name, job_title, osha_level, 
  phone, email, address, subcontractor_certifications FROM "user" JOIN 
  "user_job" ON "user".id = "user_job".user_id JOIN "job" ON "job".id = 
  "user_job".job_id WHERE "job".id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error retrieving active subcontractors for job', err);
      res.sendStatus(500);
    });
});

router.delete('/deleteJobConnection/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "user_job" WHERE user_id=$1;`;
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

module.exports = router;
