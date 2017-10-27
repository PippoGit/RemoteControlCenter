var DISABLED_LONGPRESS  = 0,
    INTERVAL_LONGPRESS  = 1,
    CUSTOM_LONGPRESS    = 2;


function Controller(id)
{
  this.element = $("#" + id);
  this.buttons = [];
}

Controller.prototype.addButton = function (id, action, option = 0, startAction, stopAction) {
  var button = new CButton(id);
  button.setAction(action, option, startAction, stopAction);
  this.buttons.push(button);
};

Controller.prototype.getButton = function (id) {
  var i = 0;
  for(i=0; i<this.buttons.length; i++) {
    if(this.buttons[i].id == id)
      return this.buttons[i];
  }
  return undefined;
}
