const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', function (req, res) {
  res.send('Smart Parking api works');
});

//http://mongoosejs.com/docs/2.7.x/docs/finding-documents.html
//User Tracker API
var UserTracker = require('../models/UserTracker');

router.route('/user-tracker')

// create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function (req, res) {

    var userTracker = new UserTracker();

    userTracker._userId = req.body._userId;
    userTracker.lat = req.body.lat;
    userTracker.lon = req.body.lon;
    userTracker.timestamp = req.body.timestamp;

    console.log(JSON.stringify(userTracker));

    // save the bear and check for errors
    userTracker.save(function (err, userTracker) {
      if (err) return res.status(400).json(err);
      res.status(201).json({message: 'User Tracker created!', userTracker: userTracker});

    });
  })
  .get(function (req, res) {

    UserTracker.find(function (err, userTrackers) {
      if (err)
        res.send(err);
      res.status(200).json({message: 'User Trackers', userTracker: userTrackers});
    });

  });
router.route('/user-tracker/:_id')
  .get(function (req, res) {
    UserTracker.findById(req.params._id, function (err, userTrackers) {
      if (err)
        res.send(err);
      res.status(200).json({message: 'User Tracker : ' + req.params._id, userTracker: userTrackers});
    });
  })
  .delete(function (req, res) {
    UserTracker.remove({
      _id: req.params._id
    }, function (err, userTracker) {
      if (err)
        res.send(err);

      res.json({message: 'Successfully deleted'});
    });
  });
router.route('/user-tracker/find')
  .post(function (req, res) {
    UserTracker.find(req.body, function (err, userTrackers) {
      if (err)
        res.send(err);
      res.status(200).json({
        message: 'User Tracker : ' + req.params.userId, userTracker: userTrackers
      });
    });
  });


//create Log line comming from IntroMobilePage::Web-User
router.route('/parking/add')

// create a IntroWebUserLog (accessed at POST http://localhost:8080/api/introwebuserlogs)
  .post(function (req, res) {

    // create a new instance of the IntroWebUserLog model
    var parkingDTO = new ParkingDTO();
    // set the introWebUserLog atttributes (comes from the request)
    parkingDTO = req.body;


    fs.appendFile('./public/parkings.log', JSON.stringify(parkingDTO, replacer) + '\n', function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('file parking was modified !');
      }
    });

    res.status(200).json({
      message: 'ParkingDTO instance was created successfuly',
      ParkingDTO: parkingDTO
    });

  });
router.route('/parking/visite')

  .post(function (req, res) {

    // create a new instance of the IntroWebUserLog model
    var parkingVisiteDTO = new ParkingVisiteDTO();
    // set the introWebUserLog atttributes (comes from the request)
    parkingVisiteDTO = req.body;



    fs.appendFile('./public/parkings-visites.log', JSON.stringify(parkingVisiteDTO, replacer) + '\n', function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('file parking-visites was modified !');
      }
    });

    res.status(200).json({
      message: 'ParkingVisiteDTO instance was created successfuly',
      ParkingVisiteDTO: parkingVisiteDTO
    });

  });

module.exports = router;
