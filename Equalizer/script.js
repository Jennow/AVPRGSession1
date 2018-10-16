
document.addEventListener('DOMContentLoaded', function(){
  var $sliders = document.querySelectorAll("input[type=range]");
  console.log($sliders);
  var $playBtn = document.getElementById('playStopBtn');

  var context = new AudioContext();
  var sound = new Audio("sound.wav");
  var source = context.createMediaElementSource(sound);
  var filter = context.createBiquadFilter();

  var isPlaying = false;

  source.connect(filter);
  filter.connect(context.destination);

  sound.loop = true;

  $sliders.forEach($slider => {
    $slider.addEventListener('change', function(){
      switch($slider.name){
        case 'frequency-slider': filter.frequency.value = $slider.value ; document.getElementById('frequency-label').innerHTML= "Frequency: "+ $slider.value + " Hz";break;
        case 'type-slider': {
          console.log($slider.value);
          var type = 'lowpass';
          switch($slider.value){
            case "1": filter.type = type = 'lowpass'; break;
            case "2": filter.type = type = 'highpass'; break;
            case "3": filter.type = type = 'bandpass'; break;
            case "4": filter.type = type = 'lowshelf'; break;
            case "5": filter.type = type = 'highshelf'; break;
            case "6": filter.type = type = 'peaking'; break;
            case "7": filter.type = type = 'notch'; break;
            case "8": filter.type = type = 'allpass'; break;
          }
          document.getElementById('type-label').innerHTML= "Type: "+ type;
          break;
        }
        case 'detune-slider': filter.detune.value = $slider.value ; document.getElementById('detune-label').innerHTML= "Detune: "+ $slider.value + " Cents"; break;
        case 'quality-slider': filter.Q.value = $slider.value ; document.getElementById('quelity-label').innerHTML= "Quality: "+ $slider.value; break;
        case 'gain-slider': filter.gain.value = $slider.value ;document.getElementById('gain-label').innerHTML= "Gain: "+ $slider.value + "dB"; break;
      }
    });
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





