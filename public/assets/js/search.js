document.getElementById("Search").onclick = function () {
  var joyVal = document.getElementById("joyRange").value;
  var angerVal = document.getElementById("angerRange").value;
  var sadnessVal = document.getElementById("sadnessRange").value;
  var disgustVal = document.getElementById("disgustRange").value;
  var fearVal = document.getElementById("fearRange").value;
  var url = "/?anger=" + angerVal +"&disgust=" + disgustVal + "&fear=" + fearVal + "&joy=" + joyVal + "&sadness=" + sadnessVal;
  console.log(url);
  var bestsongs = $.getJSON('/searchsong' + url, function(data){
      var artistAndSong = data[0].artist + " - " + data[0].song;
    });
  console.log(artistAndSong);
  };
