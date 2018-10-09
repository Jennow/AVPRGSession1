document.addEventListener('DOMContentLoaded', function(){

  var context = new AudioContext();
  var $playBtn = document.querySelector('.play-btn');
  var $gainRange = document.querySelector('#gain-range');
  var $panningRange = document.querySelector('#panning-range');
  var $delayRange = document.querySelector('#delay-range');

  var isPlaying = false;
  var sound = new Audio("sound.wav");
  var soundNode = context.createMediaElementSource(sound);

  var gain = context.createGain();
  var stereoPanner = context.createStereoPanner();
  var delay = context.createDelay(4.0);

  sound.loop = true;
  soundNode.connect(gain);
  gain.connect(delay);
  delay.connect(stereoPanner);
  stereoPanner.connect(context.destination);

  $playBtn.addEventListener('click', function(){
    if(isPlaying){
      sound.pause();
      sound.currentTime = 0;

      isPlaying = false;
    } else {
    sound.play();
      isPlaying = true;
    }
  });

  $gainRange.addEventListener('change', function(e){
    var gainValue = this.value/ 20;
    gain.gain.value = gainValue;
    document.getElementById("gainOutput").innerHTML = gainValue+" dB";
  });

  $panningRange.addEventListener('change', function(e){
    var panValue = (this.value-50) / 50;
    stereoPanner.pan.value = panValue;
    document.getElementById("panOutput").innerHTML = panValue+" LR";
  });

  $delayRange.addEventListener('change', function(e){
    var delayValue = (this.value / 25);
    delay.delayTime.value = delayValue;
    document.getElementById("delayOutput").innerHTML = delayValue+" Sekunden";
  });

  sound.addEventListener('ended', function(){
    isPlaying = false;
  })
});