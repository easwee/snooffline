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

Controls.prototype.init = function(game) {
  window.addEventListener(
    "keyup",
    event => {
      if (event.keyCode === ENUMS.PAUSE || event.keyCode === ENUMS.P) {
        this.handleGamePause();
        return;
      }

      this.onKeyup(event);
    },
    false
  );

  window.addEventListener(
    "keydown",
    event => {
      this.onKeydown(event);
      console.log(event.keyCode);
    },
    false
  );

  this.handleGamePause = event => {
    if (game.paused) {
      game.sound.startMusic();
    } else {
      game.sound.stopMusic();
    }
    game.paused = !game.paused;
  };
};
