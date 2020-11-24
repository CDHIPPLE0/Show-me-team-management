const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
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

module.exports = router;
