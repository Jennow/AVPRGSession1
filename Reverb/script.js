
document.addEventListener('DOMContentLoaded', function(){
  var $select = document.getElementById('reverb-select');
  var $playBtn = document.getElementById('playStopBtn');
  var undecodedAudio;
  var convolver;
  var context = new AudioContext();
  var sound = new Audio("sound.wav");
  var source = context.createMediaElementSource(sound);

  var isPlaying = false;
  sound.loop = true;
  loadImpulseResponse($select.value);


  $select.addEventListener('change', function(){
    loadImpulseResponse($select.value)
  });

  function loadImpulseResponse(name){
    var request = new XMLHttpRequest();
    request.open("GET",  "impulseResponses/"+name+".wav", true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
          if(convolver){
            source.disconnect(convolver);
          }
            convolver = context.createConvolver();
            convolver.buffer = buffer;
            convolver.normalize = true;
            source.connect(convolver);
            convolver.connect(context.destination);
        });
    };
    request.send();
  }

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





