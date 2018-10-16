
document.addEventListener('DOMContentLoaded', function(){
  var $thresholdSlider = document.getElementById('threshold-slider');
  var $ratioSlider = document.getElementById('ratio-slider');
  var $kneeSlider = document.getElementById('knee-slider');
  var $attacklider = document.getElementById('attack-slider');
  var $releaseSlider = document.getElementById('release-slider');
  var $playBtn = document.getElementById('playStopBtn');

  var context = new AudioContext();
  var sound = new Audio("sound.wav");
  var source = context.createMediaElementSource(sound);
  var compressor = context.createDynamicsCompressor();

  var isPlaying = false;

  source.connect(compressor);
  compressor.connect(context.destination);
  

  sound.loop = true;

  $thresholdSlider.addEventListener('change', function(){
    compressor.threshold.value = $thresholdSlider.value;
    
  });

  $ratioSlider.addEventListener('change', function(){
    compressor.threshold.value = $thresholdSlider.value;
  });

  $thresholdSlider.addEventListener('change', function(){
    compressor.ratio.value = $ratioSlider.value;
  });

  $kneeSlider.addEventListener('change', function(){
    compressor.knee.value = $kneeSlider.value;
  });

  $attacklider.addEventListener('change', function(){
    compressor.attack.value = $attacklider.value;
  });

  $releaseSlider.addEventListener('change', function(){
    compressor.release.value = $releaseSlider.value;
  });


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





