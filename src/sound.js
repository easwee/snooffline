function Sound() {}

Sound.prototype.init = function(game) {
  this.sounds = {
    MOVE: 1,
    PICKUP_COCAINE: 2,
    JUMP: 3,
    BONUS: 4
  };

  setInterval(this.backgroundMusic, 4000);
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
    523.25, //frequency
    0.05, //attack
    0.2, //decay
    "sine", //waveform
    3, //volume
    0.8, //pan
    0, //wait before playing
    600, //pitch bend amount
    true, //reverse
    100, //random pitch range
    0, //dissonance
    undefined, //echo array: [delay, feedback, filter]
    undefined //reverb array: [duration, decay, reverse?]
  );
};

Sound.prototype.moveSound = function() {
  soundEffect(
    110, //frequency
    0.01, //attack
    0.01, //decay
    "sine", //waveform
    3, //volume
    0.8, //pan
    0, //wait before playing
    600, //pitch bend amount
    true, //reverse
    100, //random pitch range
    0, //dissonance
    undefined, //echo array: [delay, feedback, filter]
    undefined //reverb array: [duration, decay, reverse?]
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
};

Sound.prototype.backgroundMusic = function() {
  
  const s = 4;
  const pb = 0;
  const atk = 0.05;
  const g = (l, f, d=0.2) => {
    soundEffect(midiTable[f].frq, atk, d, "square", 1, 0, l / s, pb);
    soundEffect(midiTable[f+5].frq, atk, d, "square", 1, 0, l / s, pb);  
    soundEffect(midiTable[f+12].frq, atk, d, "square", 1, 0, l / s, pb);  
  }

  const tick = (l) => soundEffect(40, 0, .1, "square", 5, 0, l / s, pb);
  const tock = (l) => soundEffect(80, 0, .1, "square", 5, 0, l / s, pb);

  const B = 35+12;
  const E = 40+12;
  const D = 38+12;
  
  tick(0);
  g(0, E);  
  g(1, E);

  tock(2);
  g(2, D);
  g(3, E);
  
  tick(4);
  g(5, B);
  tock(6);
  g(6, E);
  g(8, D, .8);
  tick(8);
  
  tock(10);
  g(10, E+24);
  g(12, E+22);
  g(14, E+20);
  tick(12);
  tock(14);
  g(16, E+19, .8);
};
