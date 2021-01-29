const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
// Route includes
const userRouter = require('./routes/user.router');
const subcontractorRouter = require('./routes/subcontractor.router');
const vendorRouter = require('./routes/vendor.router');
const jobRouter = require('./routes/job.router');
const userJobRouter = require('./routes/userJob.router');
const twilio = require('./routes/twilio');
const unverified = require('./routes/unverified.router');
const nodeMailer = require('./routes/nodeMailer');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/nodeMailer', nodeMailer);
app.use('/api/subcontractor', subcontractorRouter);
app.use('/api/vendor', vendorRouter);
app.use('/api/job', jobRouter);
app.use('/api/userJob', userJobRouter);
app.use('/api/twilio', twilio);
app.use('/api/unverified', unverified);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
