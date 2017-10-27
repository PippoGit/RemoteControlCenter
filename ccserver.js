var express = require('express');
var path = require('path');
var osa = require('node-osascript');
var config = require('./config/default.json');
var app = express();

var interval = 0;

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Remote Control Center started on port 3000.');
  console.log("Player: " + config.player);
  console.log("To change main player: localhost:3000/player/<NAME>");
  console.log("Supported players: iTunes, Spotify, VLC");
});

app.get('/changeplayer/:player', function (req, res) {
  const fs = require('fs');
  config.player = req.params.player;

  fs.writeFile('./config/default.json', JSON.stringify(config), (err) => {
      if (err) throw err;
      console.log('Configuration file correctly changed. New player is ' + req.params.player);
  });

  res.send("Player setted to " + config.player);
});

app.get('/', function (req, res) {
  res.sendFile(path.join('index.html'));
});

app.get('/volumeup', function (req, res) {
  changeVolume(1);
  res.sendStatus(200);
});

app.get('/volumedown', function (req, res) {
  changeVolume(-1);
  res.sendStatus(200);
});

app.get('/next', function (req, res) {
  iTunes("next track");
  res.sendStatus(200);
});

app.get('/previous', function (req, res) {
  iTunes("previous track");
  res.sendStatus(200);
});

app.get('/playpause', function (req, res) {
  iTunes("playpause");
  res.sendStatus(200);
});

app.get('/fastforward/:action', function (req, res) {
  if(req.params.action == "stop")
    iTunes("resume");
  else
    iTunes("fast forward");
  res.sendStatus(200);
});

app.get('/rewind/:action', function (req, res) {
  if(req.params.action == "stop")
    iTunes("resume");
  else
    iTunes("rewind");
  res.sendStatus(200);
});

app.get('/itunes', function (req, res) {
  iTunes("quit");
  res.sendStatus(200);
});

function changeVolume(op) {
  osa.execute("set volume output volume (output volume of (get volume settings) + " + (op*5) + ") --100%");
}

function iTunes(cmd)
{
  osa.execute("if application \"" + config.player + "\" is running then return \"1\"", function (err, result, raw) {
    if (err) return console.error(err);

    if(result)
      osa.execute("tell application \"" + config.player + "\" to " + cmd);
    else
      mediaFunction(cmd);
  });
}

function mediaFunction(cmd)
{
  switch (cmd) {
    case 'playpause':
      osa.execute("tell application \"System Events\" to keystroke space");
      break;

    case 'fast forward':
      osaInterval("tell application \"System Events\" to key code 124");
      break;

    case 'next track':
      osa.execute("tell application \"System Events\" to key code 124");
      break;

    case 'rewind':
      osaInterval("tell application \"System Events\" to key code 123");
      break;

    case 'previous track':
      osa.execute("tell application \"System Events\" to key code 123");
      break;

    case 'quit':
      osa.execute("tell application \"" + config.player + "\" to activate");
      break;

    case 'resume':
      clearInterval(interval);
      break;

    default:
      console.error("error");
  }
}

function osaInterval(cmd) {
  interval = setInterval(function(){
    osa.execute(cmd);
  }, 300);
}
