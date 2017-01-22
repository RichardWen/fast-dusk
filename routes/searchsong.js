var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var uri = 'mongodb://heroku_wv4h5wp1:r5akor7anlbqtb3gu7gpuk89qr@ds145405.mlab.com:45405/heroku_wv4h5wp1';

router.get('/', function(req, res) {
  mongodb.MongoClient.connect(uri, function(err, db) {
    if(err) throw err;
    //console.log("Here");
    //console.log(req.query['anger']/100);
    var songs = db.collection('songs');
    var angerIndex = req.query['anger']/100;
    var disgustIndex = req.query['disgust']/100;
    var fearIndex = req.query['fear']/100;
    var joyIndex = req.query['joy']/100;
    var sadnessIndex = req.query['sadness']/100;
    var normalize = (angerIndex + disgustIndex + fearIndex + joyIndex + sadnessIndex);
    var resSongs = [];
    /* angerIndex /= normalize;
    disgustIndex /= normalize;
    fearIndex /= normalize;
    joyIndex /= normalize;
    sadnessIndex /= normalize; */
    var variance = 0.5;
    songs.find(
      {
        anger: {$lt:(angerIndex+variance), $gt: (angerIndex-variance)},
        disgust: {$lt: (disgustIndex+variance), $gt: (disgustIndex-variance)},
        fear: {$lt: (fearIndex+variance), $gt: (fearIndex-variance)},
        joy: {$lt: (joyIndex+variance), $gt: (joyIndex-variance)},
        sadness: {$lt: (sadnessIndex+variance), $gt: (sadnessIndex-variance)}
      }).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        for(var i = 0; i < result.length || i < 5; i++)
        {
          resSongs.push(result[i]);
        }
        res.send(resSongs);
        res.end();
      } else {
        console.log('No no nO No NO');
      }
      //Close connection
      db.close();
    });

  });
});
module.exports = router;
