var cc;

$(document).ready(function() {
  cc = new Controller("controller");
  cc.addButton("menu", iTunesStartStop);
  cc.addButton("play", playPause);
  cc.addButton("next", iTunesNextTrack, CUSTOM_LONGPRESS, iTunesFastforwardStart, iTunesFastforwardStop);
  cc.addButton("before", iTunesPreviousTrack, CUSTOM_LONGPRESS, iTunesRewindStart, iTunesRewindStop);
  cc.addButton("volumeup", increaseVolume, INTERVAL_LONGPRESS);
  cc.addButton("volumedown", decreaseVolume, INTERVAL_LONGPRESS);
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
