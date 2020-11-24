const accountSid = process.env.TWILIO_ACCOUNT_SSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const client = require('twilio')(accountSid, authToken);
const router = express.Router();

router.post('/send', rejectUnauthenticated, (req, res) => {
  client.messages
    .create({
      body:
        'This is a test of the Show_Me_Stainless_Team_management embedded Twilio api.',
      from: '+13862048962',
      to: '+16609246155',
    })
    .then((message) => console.log(message.sid))
    .then(() => res.sendStatus(200));
});

module.exports = router;
