$(document).ready(function() {
  var timeout = 0;
  var cc = new Controller("container");

  cc.addButton("menu", iTunesStartStop);
  cc.addButton("play", playPause);
  cc.addButton("next", iTunesNextTrack, 1);
  cc.addButton("before", iTunesPreviousTrack, 1);
  cc.addButton("volumeup", increaseVolume, 1);
  cc.addButton("volumedown", decreaseVolume, 1);
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
