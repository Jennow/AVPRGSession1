document.addEventListener('DOMContentLoaded', function(){
  var $drumpads = document.getElementById('drums');
  var context = new AudioContext();

  soundbuffers = [];
  for(let i = 0; i < $drumpads.children.length; i++){
    soundbuffers[i] = new Audio("sounds/sound"+(i+1)+".wav");
    var soundNode = context.createMediaElementSource(soundbuffers[i]);
    var gainNode = context.createGain();

    gainNode.gain.value = 0.8;

    soundNode.connect(gainNode);
    gainNode.connect(context.destination);
    
    $drumpads.children[i].addEventListener('click', function(e){
      context.resume().then(() => {
        soundbuffers[i].play()
      });
      
    });
  }
});
