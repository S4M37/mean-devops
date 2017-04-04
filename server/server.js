// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./routes/user-tracker.api');

const app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://ec2-54-194-223-177.eu-west-1.compute.amazonaws.com:27017/smart-parking', function (err, db) {

  console.log(err);
  console.log(JSON.stringify(db));
}); // connect to our database

// Parsers for POST data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// middleware to use for all requests
app.use(function (req, res, next) {
  // do logging
  if (req.url.indexOf("api") > -1) {

    console.log('');
    console.log('###### Request Triggered ######');

    console.log('From :' + req.url);
    if (req.body !== null) {
      console.log('With a body content :' + JSON.stringify(req.body));
    }
    console.log('###############################');
    console.log('');

  }
  next(); // make sure we go to the next routes and don't stop here

});
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
  console.log("Smart Parking API running on localhost:" + port);
});
