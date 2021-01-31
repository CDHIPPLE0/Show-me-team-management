const express = require('express');
const { urlencoded } = require('body-parser');
const router = express.Router();
const nodemailer = require('nodemailer');
const app = express();
app.use(urlencoded({ extended: false }));

router.put('/send', (req, res) => {
  console.log(req.body);
  const transportConfig = {
    service: 'yahoo',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(transportConfig);
  const mailOptions = {
    from: process.env.MAILER_EMAIL, // sender address
    to: process.env.MAILER_EMAIL, // list of receivers
    subject: req.body.subject, // Subject line
    html: `<div>
  <p>${req.body.name} at ${req.body.email} Writes: ${req.body.message}.</p>
</div>`, // plain text body
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err != null) {
      console.log(err, 'there is an error sending the email');
      res.sendStatus(500);
      return;
    }
    res.sendStatus(201);
  });
});

module.exports = router;
