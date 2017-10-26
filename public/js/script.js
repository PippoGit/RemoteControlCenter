$(document).ready(function() {
  var timeout = 0;

  $("#menu").on('click tap', iTunesStartStop);
  $("#play").on('click tap', playPause);
  $("#next").on('click tap', iTunesNextTrack);
  $("#before").on('click tap', iTunesPreviousTrack);
  $("#volumeup").on('touchstart mousedown click tap', function(e){
      increaseVolume();
      if(e.type == "click")
        return;
      timeout = setInterval(function(){
          increaseVolume();
      }, 500);
      return false;
  });
  $("#volumedown").on('touchstart mousedown click tap', function(e){
      decreaseVolume();
      if(e.type == "click")
        return;
      timeout = setInterval(function(){
          decreaseVolume();
      }, 500);
      return false;
  });

  $("#volumeup, #volumedown").on('touchend mouseup touchcancel', function(){
      clearInterval(timeout);
      return false;
  });
});

function playPause()
{
  $.get("playpause");
}

function increaseVolume()
{
  $.get("volumeup");
}

function decreaseVolume()
{
  $.get("volumedown");
}

function iTunesNextTrack()
{
  $.get("next");
}

function iTunesPreviousTrack()
{
  $.get("previous");
}

function iTunesStartStop()
{
  $.get("itunes");
}
