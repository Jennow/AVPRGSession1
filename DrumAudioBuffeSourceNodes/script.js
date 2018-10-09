document.addEventListener('DOMContentLoaded', function(){
  var $drumpads = document.getElementById('drums');
  var context = new AudioContext();

  sourceBuffers = [];
  requests = [];

  for(let i = 0; i < $drumpads.children.length; i++){
    getData(i);
    $drumpads.children[i].addEventListener('click', function(e){
      playSound(i);
    });
  }

  function getData(i){
    requests[i] = new XMLHttpRequest();
    requests[i].open('GET', "sounds/sound"+(i+1)+".wav", true);
    requests[i].responseType = 'arraybuffer';
    requests[i].onload = function() {
      var undecodedAudio = requests[i].response;
      context.decodeAudioData(undecodedAudio, function(buffer){
        sourceBuffers[i]= buffer;
      });
    }
    requests[i].send();
  }

  function playSound(i){
    var sourceBuffer = context.createBufferSource();
    sourceBuffer.buffer = sourceBuffers[i];
    sourceBuffer.connect(context.destination);
    sourceBuffer.start(context.currentTime);
  }
});
