
document.addEventListener('DOMContentLoaded', function(){
  var $slider = document.getElementById("distortion-slider");
  var $playBtn = document.getElementById('playStopBtn');

  var context = new AudioContext();
  var sound = new Audio("sound.wav");
  var source = context.createMediaElementSource(sound);
  var distortion = context.createWaveShaper();

  source.connect(distortion);
  distortion.connect(context.destination);

  var isPlaying = false;
  sound.loop = true;
  distortion.oversample = "4x";

  $slider.addEventListener('change', function(){
    distortion.curve = makeDistortionCurve($slider.value);
    document.getElementById('distortion-label').innerHTML = "Distortion: " + $slider.value;
  });

  function makeDistortionCurve(amount) {    
    var n_samples = 44100,
        curve = new Float32Array(n_samples);
    for (var i = 0; i < n_samples; ++i ) {
        var x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + (amount * Math.abs(x)));
    }
    return curve;
  };

  $playBtn.addEventListener('click', function(){
    if(isPlaying){
      sound.pause();
      sound.currentTime = 0;
      $playBtn.innerHTML = "Play";
      $playBtn.className = "paused";
      isPlaying = false;
    } else {
      sound.play();
      isPlaying = true;
      $playBtn.innerHTML = "Pause";
      $playBtn.className = "playing";
    }
  });
});





