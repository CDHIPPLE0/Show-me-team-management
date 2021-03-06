const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const registeredAs = req.body.registeredAs;
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;
  const jobTitle = req.body.jobTitle;
  const oshaLevel = req.body.osha;
  const certs = req.body.certs;
  const company = req.body.company;

  const queryText = `INSERT INTO "user" (username, password, registered_as,
    access_level_id, first_name, last_name, phone, email, address, job_title, osha_level,
    subcontractor_certifications, job_status, is_selected, vendor_company)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`;
  pool
    .query(queryText, [
      username,
      password,
      registeredAs,
      1,
      fName,
      lName,
      phone,
      email,
      address,
      jobTitle,
      oshaLevel,
      certs,
      false,
      false,
      company,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT first_name, address, last_name, phone, email, job_title, osha_level, vendor_company, subcontractor_certifications
    FROM "user" WHERE id = $1;`;
  const queryArray = [req.params.id];
  pool
    .query(queryText, queryArray)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting user information', err);
      res.sendStatus(500);
    });
});

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT first_name, address, last_name, phone, email, job_title, osha_level, vendor_company, subcontractor_certifications
    FROM "user" WHERE access_level_id = 1;`;
  const queryArray = [req.params.id];
  pool
    .query(queryText, queryArray)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting unverified users', err);
      res.sendStatus(500);
    });
});

router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;
  const jobTitle = req.body.jobTitle;
  const oshaLevel = req.body.osha;
  const certs = req.body.certs;
  const company = req.body.company;

  const queryText = `UPDATE "user" SET phone=$2, email=$3, address=$4, job_title=$5, osha_level=$6,
    subcontractor_certifications=$7, vendor_company=$8 WHERE id=$1`;
  const queryArray = [
    req.params.id,
    phone,
    email,
    address,
    jobTitle,
    oshaLevel,
    certs,
    company,
  ];
  pool
    .query(queryText, queryArray)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User edit failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/setJobStatusTrue/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "user" SET job_status=true WHERE id=$1;`;
  const queryArray = [req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/setJobStatusFalse/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "user" SET job_status=false WHERE id=$1;`;
  const queryArray = [req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/selectFalse/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "user" SET is_selected=false WHERE id=$1;`;
  const queryArray = [req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/selectTrue/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "user" SET is_selected=true WHERE id=$1;`;
  const queryArray = [req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/selectAllFalse/', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "user" SET is_selected=false WHERE access_level_id=2 AND job_status=false;`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/selectAllTrue/', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "user" SET is_selected=true WHERE access_level_id=2 AND job_status=false;;`;

  pool
    .query(queryText)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/delete/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `  DELETE FROM "user" WHERE id = $1;`;
  const queryArray = [req.params.id];
  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/verify/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "user" SET access_level_id=registered_as WHERE id=$1;`;
  const queryArray = [req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
