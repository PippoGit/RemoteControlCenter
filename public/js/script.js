var cc;

$(document).ready(function() {
  cc = new Controller("controller");
  cc.addButton("menu", iTunesStartStop);
  cc.addButton("play", playPause);
  cc.addButton("next", iTunesNextTrack, CUSTOM_STARTSTOPACTION, iTunesFastforwardStart, iTunesFastforwardStop);
  cc.addButton("before", iTunesPreviousTrack, CUSTOM_STARTSTOPACTION, iTunesRewindStart, iTunesRewindStop);
  cc.addButton("volumeup", increaseVolume, ALLOW_LONGPRESS);
  cc.addButton("volumedown", decreaseVolume, ALLOW_LONGPRESS);
});

function playPause() {
  $.get("playpause");
}

function increaseVolume() {
  $.get("volumeup");
}

function decreaseVolume() {
  $.get("volumedown");
}

function iTunesNextTrack() {
  $.get("next");
}

function iTunesPreviousTrack() {
  $.get("previous");
}

function iTunesStartStop() {
  $.get("itunes");
}

function iTunesFastforwardStart() {
  $.get("fastforward/start");
}

function iTunesFastforwardStop() {
  $.get("fastforward/stop");
}

function iTunesRewindStart() {
  $.get("rewind/start");
}

function iTunesRewindStop() {
  $.get("rewind/stop");
}
