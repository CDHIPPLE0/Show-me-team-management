const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.delete('/deleteVendor/:id', rejectUnauthenticated, (req, res) => {
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
  const queryText = `SELECT first_name, last_name, phone, email, vendor_company
    FROM "user" WHERE access_level_id = 3;`;
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
