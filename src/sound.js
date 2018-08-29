function Sound() {}

Sound.prototype.init = function(game) {
  this.sounds = {
    MOVE: 1,
    PICKUP_COCAINE: 2,
    JUMP: 3,
    BONUS: 4,
  };
};

Sound.prototype.playSound = function(sound) {
  switch (sound) {
    case this.sounds.PICKUP_COCAINE:
      this.pickupSound();
      break;
    case this.sounds.MOVE:
      this.moveSound();
      break;
    case this.sounds.BONUS:
      this.bonusSound();
      break;
    case this.sounds.JUMP:
      this.jumpSound();
      break;
    default:
      console.warn("No such sound:", sound);
  }
};

Sound.prototype.jumpSound = function() {
  soundEffect(
    523.25,       //frequency
    0.05,         //attack
    0.2,          //decay
    "sine",       //waveform
    3,            //volume
    0.8,          //pan
    0,            //wait before playing
    600,          //pitch bend amount
    true,         //reverse
    100,          //random pitch range
    0,            //dissonance
    undefined,    //echo array: [delay, feedback, filter]
    undefined     //reverb array: [duration, decay, reverse?]
  );
};

Sound.prototype.moveSound = function() {
  soundEffect(
    110,       //frequency
    0.01,         //attack
    0.01,          //decay
    "sine",       //waveform
    3,            //volume
    0.8,          //pan
    0,            //wait before playing
    600,          //pitch bend amount
    true,         //reverse
    100,          //random pitch range
    0,            //dissonance
    undefined,    //echo array: [delay, feedback, filter]
    undefined     //reverb array: [duration, decay, reverse?]
  );
};

Sound.prototype.pickupSound = function() {
 //D
 soundEffect(midiTable[74].frq, 0, 0.2, "square", 1, 0, 0);
 //A
 soundEffect(midiTable[81].frq, 0, 0.2, "square", 1, 0, 0.1);
 //High D
 soundEffect(midiTable[98].frq, 0, 0.3, "square", 1, 0, 0.2);
};

Sound.prototype.bonusSound = function() {
  //D
  soundEffect(587.33, 0, 0.2, "square", 1, 0, 0);
  //A
  soundEffect(880, 0, 0.2, "square", 1, 0, 0.1);
  //High D
  soundEffect(1174.66, 0, 0.3, "square", 1, 0, 0.2);
}