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
  const description = req.body.description;
  const address = req.body.address;
  const creator = req.body.creator;
  const queryText = `INSERT INTO "job" (description, job_address, job_creator_id) 
  VALUES ($1, $2, $3)`;
  pool
    .query(queryText, [description, address, creator])
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
