const express = require('express');
// get an instance of the express Router
var router = express.Router();
//filestream API: for managing files
var fs = require('fs');

function replacer(key, value) {
  if (key == "_id") return undefined;
  else return value;
}

/*
 * ElasticSearch Client
 */
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'http://elastic:changeme@localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 1000,
}, function (error) {
  if (error) {
    console.error('Elasticsearch cluster is down!');
  } else {
    console.log('Elasticsearch cluster is up');
  }
});

//api health
router.get('/', function (req, res) {
  res.status(200).json({message: 'Smart Parking Elastic API is running !', Status: "green"});
});

//create Log line comming from IntroMobilePage::Web-User
router.route('/parking/nearby')

// create a IntroWebUserLog (accessed at POST http://localhost:8080/api/introwebuserlogs)
  .post(function (req, res) {

    // create a new instance of the IntroWebUserLog model
    client.search({
      index: 'smart-parking',
      type: 'parking-item',
      body: req.body
    }).then(function (resp) {
      var hits = resp.hits.hits;
      res.status(200).json({
        message: 'Nearby Parkings',
        parkings: hits
      });
    }, function (err) {
      console.trace(err.message);
    })
  });


function makeId() {
  var _Id = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 20; i++)
    _Id += possible.charAt(Math.floor(Math.random() * possible.length));
  return _Id;
}

module.exports = router;
