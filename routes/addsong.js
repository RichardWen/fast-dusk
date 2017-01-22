var mongodb = require('mongodb');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var uri = 'mongodb://heroku_wv4h5wp1:r5akor7anlbqtb3gu7gpuk89qr@ds145405.mlab.com:45405/heroku_wv4h5wp1';
// In Score
// Order is Anger, Disgust, Fear, Joy, Sadness
// songtitle
// artist
router.get('/', function(req, res, next) {
  mongodb.MongoClient.connect(uri, function(err, db) {
    if(err) throw err;
    /*
     * First we'll add a few songs. Nothing is required to create the
     * songs collection; it is created automatically when we insert.
     */
    var songs = db.collection('songs');
     // Note that the insert method can take either an array or a dict.
    fs.readFile('./routes/songdata/log2', 'utf8', function(err, data) {
        if (err) throw err;
        var lines = data.split('\r\n');
        var rotation = 0;
        var song = "";
        var artist = "";
        var anger = 0;
        var disgust = 0;
        var fear = 0;
        var joy = 0;
        var sadness = 0;
        for(var i = 0; i < lines.length; i++)
        {
          switch(rotation)
          {
            case 0:
              song = lines[i].substring(1, lines[i].length-2);
              rotation++;
              break;
            case 1:
              artist = lines[i].substring(1, lines[i].length-2);
              rotation++;
              break;
            case 2:
              anger = parseFloat(lines[i]);
              rotation++;
              break;
            case 3:
              disgust = parseFloat(lines[i]);
              rotation++;
              break;
            case 4:
              fear = parseFloat(lines[i]);
              rotation++;
              break;
            case 5:
              joy = parseFloat(lines[i]);
              rotation++;
              break;
            case 6:
              sadness = parseFloat(lines[i]);
              var input = {
                song: song,
                artist: artist,
                anger: anger,
                disgust: disgust,
                fear: fear,
                joy: joy,
                sadness: sadness
              }
              songs.insert(input, function(err, result) {
                if(err) throw err;
              });
              rotation = 0;
              break;
          }
        }
      });
  });
});


module.exports = router;
