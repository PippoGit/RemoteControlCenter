function CButton(id) {
  this.id = id;
  this.element = $("#"+id)
  this.isLongpress = 0;

  this.action = undefined;
  this.startAction = undefined;
  this.stopAction = undefined;
}

CButton.prototype.setAction = function (action, option = 0, startAction, stopAction) {
  this.action = action;
  this.element.on('tap', this.action);
  this.isLongpress = option;

  if(option == ALLOW_LONGPRESS)
    this.setLongPress(action);
  if(option == CUSTOM_STARTSTOPACTION)
    this.setLongPress(startAction, stopAction);
};

CButton.prototype.setLongPress = function (startAction, stopAction) {
  var timeout = 0, longpress = 0;
  this.startAction = startAction;
  this.stopAction = stopAction;

  this.element.on('taphold', function(e) {
      var button = cc.getButton(this.id);
      longpress = 1;

      if(button.stopAction == undefined) {
        timeout = setInterval(function() {
            button.startAction();
        }, 500);
      }
      else {
        button.startAction();
      }
      return false;
  });

  this.element.on('touchend mouseup touchcancel', function() {
      if(longpress) {
        if(stopAction == undefined)
          clearInterval(timeout);
        else
          stopAction();
        longpress = 0;
      }
      return false;
  });
}
