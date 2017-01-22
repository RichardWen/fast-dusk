var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var uri = 'mongodb://heroku_wv4h5wp1:r5akor7anlbqtb3gu7gpuk89qr@ds145405.mlab.com:45405/heroku_wv4h5wp1';

router.get('/', function(req, res) {
  mongodb.MongoClient.connect(uri, function(err, db) {
    if(err) throw err;
    console.log("Here");
    console.log(req.query['anger']/100);
    var songs = db.collection('songs');

    songs.find({anger: {$gt: 0.75}}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
      } else {
        console.log('No No No No NO');
      }
      //Close connection
      db.close();
    });

  });
});
module.exports = router;
