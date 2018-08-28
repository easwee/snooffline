function Controls() {
  this.pressed = {};

  this.isDown = keyCode => {
    return this.controls.pressed[keyCode];
  };

  this.onKeydown = event => {
    this.pressed[event.keyCode] = true;
  };

  this.onKeyup = event => {
    delete this.pressed[event.keyCode];
  };
}

Controls.prototype.init = function() {
  window.addEventListener(
    "keyup",
    event => {
      this.onKeyup(event);
    },
    false
  );
  window.addEventListener(
    "keydown",
    event => {
      this.onKeydown(event);
    },
    false
  );
};
