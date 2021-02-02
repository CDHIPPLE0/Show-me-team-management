const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT j.id, description, job_address, start_date, date_created,
  helpers_needed, welders_needed, welderfitters_needed, fitters_needed, helper_rate, 
  welder_rate,fitter_rate, 
  COUNT(uj.id) AS "count", 
  COUNT(uj.id) FILTER (WHERE u.job_title = 'Welder / Fitter') AS "WelderFitters", 
  COUNT(uj.id) FILTER (WHERE u.job_title = 'Welder') AS "Welders",
  COUNT(uj.id) FILTER (WHERE u.job_title = 'Fitter') AS "Fitters",
  COUNT(uj.id) FILTER (WHERE u.job_title = 'Helper') AS "Helpers"
  FROM "job" j
  LEFT JOIN "user_job" uj ON j.id = uj.job_id
  LEFT JOIN "user" u ON uj.user_id = u.id 
  GROUP BY j.id
  ORDER BY start_date ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting jobs', err);
      res.sendStatus(500);
    });
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "job".id, description, job_address, job_creator_id, 
  first_name, last_name, vendor_company, start_date, date_created, helpers_needed, 
  welders_needed, fitters_needed, helper_rate, welder_rate,fitter_rate, per_diem
  FROM "job" JOIN "user" ON "job".job_creator_id = "user".id WHERE "job".id = $1;`;
  pool
    .query(queryText, [req.params.id])
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
  const startDate = req.body.startDate;
  const address = req.body.address;
  const creator = req.body.jobCreator;
  const helpersNeeded = req.body.helpersNeeded;
  const weldersNeeded = req.body.weldersNeeded;
  const fittersNeeded = req.body.fittersNeeded;
  const welderFittersNeeded = req.body.welderFittersNeeded;
  const helperRate = req.body.helperRate;
  const welderRate = req.body.welderRate;
  const fitterRate = req.body.fitterRate;
  const perDiem = req.body.perDiem;
  const queryText = `INSERT INTO "job" (description,start_date, job_address, job_creator_id, 
  helpers_needed, welders_needed, fitters_needed, welderfitters_needed, helper_rate,welder_rate,fitter_rate, per_diem) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
  pool
    .query(queryText, [
      description,
      startDate,
      address,
      creator,
      helpersNeeded,
      weldersNeeded,
      fittersNeeded,
      welderFittersNeeded,
      helperRate,
      welderRate,
      fitterRate,
      perDiem,
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

router.put('/setActive/:id', rejectUnauthenticated, (req, res) => {
  console.log(req);
  const queryText = `UPDATE "job" SET is_active=true WHERE id=$1;`;
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

router.put('/setInactive/:id', rejectUnauthenticated, (req, res) => {
  console.log(req);
  const queryText = `UPDATE "job" SET is_active=false  WHERE id=$1;`;
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
