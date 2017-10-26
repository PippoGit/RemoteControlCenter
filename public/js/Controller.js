function Controller(id)
{
  this.element = $("#" + id);
  this.buttons = [];
}

Controller.prototype.addButton = function(id, action, SET_LONGPRESS = 0) {
  var button = $("#" + id);

  button.on('click tap', action);

  if(SET_LONGPRESS)
  {
    var timeout = 0;
    button.on('touchstart mousedown click tap', function(e){
        action();
        if(e.type == "click")
          return;
        timeout = setInterval(function(){
            action();
        }, 500);
        return false;
    });

    button.on('touchend mouseup touchcancel', function(){
        clearInterval(timeout);
        return false;
    });
  }

  this.buttons.push(button);
};
