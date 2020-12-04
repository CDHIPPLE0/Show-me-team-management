const accountSid = process.env.TWILIO_ACCOUNT_SSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const dataGuid = require('../modules/dataGuid');
const http = require('http');
const pool = require('../modules/pool');
const express = require('express');
const { urlencoded } = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app = express();
app.use(urlencoded({ extended: false }));

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const client = require('twilio')(accountSid, authToken);
const router = express.Router();

router.post('/', (req, res) => {
  const twiml = new MessagingResponse();
  // Access the message body and the number it was sent from.
  console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);
  twiml.message('Beep Boop I am a computer');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

router.post('/sendCustom', rejectUnauthenticated, (req, res) => {
  const userId = req.body.userId;
  const message = req.body.message;
  const queryGetText = `SELECT first_name, last_name, phone FROM "user" WHERE id = $1;`;
  const queryGetArray = [userId];
  let phone = '';
  pool
    .query(queryGetText, queryGetArray)
    .then((dbResponse) => {
      phone = dbResponse.rows[0].phone;
      console.log(phone);
      client.messages
        .create({
          body: message,
          from: '+13862048962',
          to: `+1${phone}`,
        })
        .then((message) => console.log(message.sid))
        .then(() => res.sendStatus(200));
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post('/sendAutomated', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const newGuid = dataGuid();
  const userId = req.body.userId;
  const jobId = req.body.jobId;
  const startDate = req.body.startDate;
  const jobAddress = req.body.jobAddress;
  let firstName = '';
  let lastName = '';
  let phone = '';

  const queryGetText = `SELECT first_name, last_name, phone FROM "user" WHERE id = $1;`;
  const queryGetArray = [userId];
  pool
    .query(queryGetText, queryGetArray)
    .then((dbResponse) => {
      console.log(dbResponse.rows[0]);
      firstName = dbResponse.rows[0].first_name;
      lastName = dbResponse.rows[0].last_name;
      phone = dbResponse.rows[0].phone;
      console.log(firstName, lastName, phone);
    })
    .then(() => {
      const queryText = `INSERT INTO "job_user_message" ("job_id", "user_id", "message_id") 
    VALUES ($1 , $2, $3);`;
      const queryArray = [jobId, userId, newGuid];
      const message = `This is Show Me Stainless Inc with an automated message for ${firstName} ${lastName}.

    If you would like to be considered for a job starting 

    ${startDate} 

    at 
    
    ${jobAddress}
    
    then please click this link  http://09dbb34fdee6.ngrok.io/api/twilio/accept/${newGuid}
  
    To reject this offer please click the link below.
    http://09dbb34fdee6.ngrok.io/api/twilio/reject/${newGuid};`;

      pool
        .query(queryText, queryArray)
        .then((dbResponse) => {
          client.messages
            .create({
              body: message,
              from: '+13862048962',
              to: `+1${phone}`,
            })
            .then((message) => console.log(message.sid))
            .then(() => res.sendStatus(200));
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    });
});

router.get('/accept/:id', (req, res) => {
  let uid = null;
  let jid = null;
  let firstName = '';
  let lastName = '';
  let queryThree = `DELETE FROM "job_user_message" WHERE message_id = $1;`;
  let referenceThree = [req.params.id];
  const query = `SELECT user_id, job_id FROM "job_user_message" WHERE message_id = $1;`;
  const reference = [req.params.id];
  pool
    .query(query, reference)
    .then((dbResponse) => {
      uid = dbResponse.rows[0].user_id;
      jid = dbResponse.rows[0].job_id;
      console.log('first pool', uid, jid);
    })
    .then(() => {
      let queryFour = `UPDATE "user" SET job_status=true WHERE id=$1;`;
      let referenceFour = [uid];
      let queryTwo = `INSERT INTO "user_job" ("job_id", "user_id")
    VALUES ($1, $2);`;
      let referenceTwo = [Number(jid), Number(uid)];
      pool.query(queryTwo, referenceTwo).then(() => {
        pool
          .query(queryThree, referenceThree)
          .then(() => pool.query(queryFour, referenceFour))
          .then(() => {
            const queryGetText = `SELECT first_name, last_name, phone FROM "user" WHERE id = $1;`;
            const queryGetArray = [uid];
            pool
              .query(queryGetText, queryGetArray)
              .then((dbResponse) => {
                firstName = dbResponse.rows[0].first_name;
                lastName = dbResponse.rows[0].last_name;
                phone = dbResponse.rows[0].phone;
              })
              .then(() => {
                message = `${firstName} ${lastName} ACCEPTED your offer.`;
                client.messages
                  .create({
                    body: message,
                    from: '+13862048962',
                    to: `+16609246155`,
                  })
                  .then(() => {
                    res.sendStatus(200);
                  })
                  .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                  });
              });
          });
      });
    });
});

router.get('/reject/:id', (req, res) => {
  let firstName = '';
  let lastName = '';
  let uid = null;
  let jid = null;
  const queryUser = `SELECT user_id, job_id FROM "job_user_message" WHERE message_id = $1;`;
  const referenceUser = [req.params.id];
  pool
    .query(queryUser, referenceUser)
    .then((dbResponse) => {
      uid = dbResponse.rows[0].user_id;
      jid = dbResponse.rows[0].job_id;
      console.log('first pool', uid, jid);
    })
    .then(() => {
      const queryGetText = `SELECT first_name, last_name, phone FROM "user" WHERE id = $1;`;
      const queryGetArray = [uid];
      pool
        .query(queryGetText, queryGetArray)
        .then((dbResponse) => {
          firstName = dbResponse.rows[0].first_name;
          lastName = dbResponse.rows[0].last_name;
          phone = dbResponse.rows[0].phone;
        })
        .then(() => {
          message = `${firstName} ${lastName} REJECTED your offer.`;
          let query = `DELETE FROM "job_user_message" WHERE message_id = $1;`;
          let reference = [req.params.id];
          pool
            .query(query, reference)
            .then(() => {
              client.messages.create({
                body: message,
                from: '+13862048962',
                to: `+16609246155`,
              });
            })
            .then(() => {
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log(err);
              res.sendStatus(500);
            });
        });
    });
});

module.exports = router;
