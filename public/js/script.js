$(document).ready(function() {
  var cc = new Controller("container");

  cc.addButton("menu", iTunesStartStop);
  cc.addButton("play", playPause);
  cc.addButton("next", iTunesNextTrack, ALLOW_LONGPRESS);
  cc.addButton("before", iTunesPreviousTrack, ALLOW_LONGPRESS);
  cc.addButton("volumeup", increaseVolume, ALLOW_LONGPRESS);
  cc.addButton("volumedown", decreaseVolume, ALLOW_LONGPRESS);
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
