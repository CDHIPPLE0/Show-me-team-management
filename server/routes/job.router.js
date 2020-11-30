const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT id, description, job_address, job_creator_id 
  FROM "job";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting jobs', err);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const description = req.body.description;
  const address = req.body.address;
  const creator = req.body.jobCreator;
  const helpersNeeded = req.body.helpersNeeded;
  const weldersNeeded = req.body.weldersNeeded;
  const fittersNeeded = req.body.fittersNeeded;
  const queryText = `INSERT INTO "job" (description, job_address, job_creator_id, helpers_needed, welders_needed, fitters_needed) 
  VALUES ($1, $2, $3, $4, $5, $6)`;
  pool
    .query(queryText, [
      description,
      address,
      creator,
      helpersNeeded,
      weldersNeeded,
      fittersNeeded,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Job registration failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/editJobAddress/:id', rejectUnauthenticated, (req, res) => {
  const edit = req.body;
  const queryText = `UPDATE "job" SET address=$1 WHERE id=$2;`;
  const queryArray = [edit.newAddress, req.params.id];

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

router.put('/editJobDescription/:id', rejectUnauthenticated, (req, res) => {
  const edit = req.body;
  const queryText = `UPDATE "job" SET description=$1 WHERE id=$2;`;
  const queryArray = [edit.newDescription, req.params.id];

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

router.delete('/deleteJob/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "job" WHERE id=$1;`;
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
