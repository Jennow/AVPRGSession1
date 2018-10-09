document.addEventListener('DOMContentLoaded', function(){
  // var context = new AudioContext();
  // var oscillatorNode = context.createOscillator();
  // var gainNode = context.createGain();

  // oscillatorNode.connect(gainNode);
  // gainNode.connect(context.destination);

  // gainNode.gain.value = 0.3;
  // oscillatorNode.frequency.value = 880;
  // oscillatorNode.start(context.currentTime);


  // document.addEventListener('mousemove', function(e){
  //     context.resume().then(() => {
  //       gainNode.gain.value = (window.innerHeight / (e.clientY*2));
  //       oscillatorNode.frequency.value = (window.innerWidth / (window.innerWidth-e.clientX)) * 300;
  //     });
  // });

  var context = new AudioContext();
  var oscillator = null;
  gainNode = context.createGain();
  mousedown = false;

  document.addEventListener('mousemove', function(e){
    calculateFrequencyAndGain(e);    
  });

  document.addEventListener('mousedown', function(e){
    mousedown = true;
    oscillator = context.createOscillator();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    calculateFrequencyAndGain(e);
    oscillator.start(context.currentTime);
  });

  document.addEventListener('mouseup', function(e){
    mousedown = false;
    if(oscillator){
      oscillator.stop(context.currentTime);
      oscillator.disconnect();
    }
  });

  function calculateFrequencyAndGain(e){
    var maxFrequency = 1000;
    var minFrequency = 20;
    maxGain = 1;
    minGain = 0;
    gainNode.gain.value = ((e.clientY / window.innerHeight) * maxGain) + minGain;
    gainNode.gain.setTargetAtTime(((e.clientY / window.innerHeight) * maxGain) + minGain , context.currentTime, 0.01)
    oscillatorNode.frequency.value = ((e.clientX / window.innerWidth) * maxFrequency) + minFrequency;
    oscillator.frequency.setTargetAtTime(((e.clientX / window.innerWidth) * maxFrequency) + minFrequency, context.currentTime, 0.01);
  }
});
