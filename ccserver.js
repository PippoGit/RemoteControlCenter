var express = require('express');
var path = require('path');
var osa = require('node-osascript');
var app = express();

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Remote Control Center started on port 3000.');
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
}); //prova

app.get('/previous', function (req, res) {
  iTunes("previous track");
  res.sendStatus(200);
});

app.get('/playpause', function (req, res) {
  iTunes("playpause");
  res.sendStatus(200);
});

app.get('/itunes', function (req, res) {
  iTunes("quit");
  res.sendStatus(200);
});

function changeVolume(op) {
  osa.execute("output volume of (get volume settings)", function(err, result, raw) {
    if (err) return console.error(err);

    var volume = (result + (op*5) >= 100)? 100:result+(op*5);
    osa.execute("set volume output volume " + volume);
  });
}

function iTunes(cmd)
{
  osa.execute("if application \"iTunes\" is running then return \"1\"", function (err, result, raw) {
    if (err) return console.error(err);

    if(result)
      osa.execute("tell application \"iTunes\" to " + cmd);
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
    case 'next track':
      osa.execute("tell application \"System Events\" to key code 124");
      break;
    case 'previous track':
      osa.execute("tell application \"System Events\" to key code 123");
      break;
    case 'quit':
      osa.execute("tell application \"iTunes\" to activate");
      break;

    default:
      console.log("error");
  }
}
