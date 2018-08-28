function Sound() {
  this.y = 200;
}

Sound.prototype.init = function(game) {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  this.context = new AudioContext();
};

Sound.prototype.playSound = function(freq, duration, mute) {
  if (mute) return;
  //this.source && this.source.stop();
  debugger;
  var buffer = this.context.createBuffer(1, 22050, 22050);
  for (var channel = 0; channel < buffer.numberOfChannels; channel++) {
    // This gives us the actual ArrayBuffer that contains the data
    var nowBuffering = buffer.getChannelData(channel);

    for (var i = 0; i < buffer.length; i++) {
      // Math.random() is in [0; 1.0]
      // audio needs to be in [-1.0; 1.0]
      nowBuffering[i] = Math.sin(i / (freq / (Math.PI * 2)));
    }
  }
  this.source = this.context.createBufferSource(); // creates a sound source
  this.source.connect(this.context.destination); // connect the source to the context's destination (the speakers)
  this.source.buffer = buffer; // tell the source which sound to play

  this.source.gain.value = 0;
  this.source.start(0, 0, duration); // play the source now
  // note: on older systems, may have to use deprecated noteOn(time);
};
