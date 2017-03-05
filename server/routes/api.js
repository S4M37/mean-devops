const express = require('express');
const router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log('');
  console.log('###### Request Triggered ######');

  console.log('From :' + req.url);
  if (req.body !== null) {
    console.log('With a body content :' + JSON.stringify(req.body));
  }
  console.log('###############################');
  console.log('');

  next(); // make sure we go to the next routes and don't stop here
});


/* GET api listing. */
router.get('/', function (req, res) {
  res.send('Smart Parking api works');
});

module.exports = router;
