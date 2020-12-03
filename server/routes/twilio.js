const accountSid = process.env.TWILIO_ACCOUNT_SSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
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

router.post('/send', rejectUnauthenticated, (req, res) => {
  const message = req.body.data;
  client.messages
    .create({
      body: message,
      from: '+13862048962',
      to: '+16609246155',
    })
    .then((message) => console.log(message.sid))
    .then(() => res.sendStatus(200));
});

router.get('/change_status/:id', (req, res) => {
  const data = req.body;
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

module.exports = router;
