//import {WrapperAudioMeter} from './sound_processes.js';

let sample=[]
let sounds=[]

let sampeRecordingStarted=false
let sampleStartedTIme=0
let sampleDuration=0
let latency=false  //parce que pas de stop listening
let latencyDuration=2*60*1000;

window.onload = function(){ startListening(); }

function listenDB(meter , time){

  if (latency) return;
  if (meter.checkClipping()) return ;  // ???????????
      //console.warn(Math.round(meter.volume*1000));

  if (sampeRecordingStarted ){
      if ( performance.now()< sampleStartedTIme + sampleDuration)
          sample.push(meter.volume)
      else  stopSampling()

  }else{
      if ( sample.length>0 )
          sounds.push(meter.volume)
      if (sounds.lengh>sample.length)
          sounds.shift()
      if (array_extensions.similarSquare(sounds,sample)){
          startLatency();
          sendSms();
      }
    }
}

function startListening(){
  toggleListen(document.getElementById(),false)
   wrapperAudioMeter({
      onResult:listenDB ,
      onError: function(err){console.error(err);  }
  });
}

function startLatency(){
    latency=true;
    setTimeout(function(){latency=false;},latencyDuration)
}

function startSampling(duration){

   sample=[]
   sampleStartedTIme= performance.now();
   sampleDuration=duration
   sampeRecordingStarted=true

}

function stopSampling(){
  latency=true;
  sampeRecordingStarted=false;
  confirm("Coupez l'alarme déclenchée poour le test, afin que le système n'envoie pas de SMS immédiatement")
  latency=false
}
// Pas mon code, àa mache , à relire

    function wrapperAudioMeter(OPTIONS){
        var audioContext = null;
        var meter = null;
        var rafID = null;
        var mediaStreamSource = null;

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();

        function onMicrophoneDenied() {
            if(typeof(OPTIONS["onError"]) == "function"){
                OPTIONS.onError('Stream generation failed.');
            }
        }

        function onMicrophoneGranted(stream) {
            mediaStreamSource = audioContext.createMediaStreamSource(stream);
            meter = createAudioMeter(audioContext);
            mediaStreamSource.connect(meter);

            onLevelChange();
        }

        function onLevelChange(time) {
            if(typeof(OPTIONS["onResult"]) == "function"){
                OPTIONS.onResult(meter, time);
            }
            rafID = window.requestAnimationFrame(onLevelChange);
        }


        try {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            navigator.getUserMedia(
                {
                    "audio": {
                        "mandatory": {
                            "googEchoCancellation": "false",
                            "googAutoGainControl": "false",
                            "googNoiseSuppression": "false",
                            "googHighpassFilter": "false"
                        },
                        "optional": []
                    },
                },
                onMicrophoneGranted,
                onMicrophoneDenied
            );
        } catch (e) {
            if(typeof(OPTIONS["onError"]) == "function"){
                OPTIONS.onError(e);
            }
        }
    }

  //  window["microphoneLevel"] = wrapperAudioMeter;




function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {

	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.98;
	processor.averaging = averaging || 0.95;
	processor.clipLag = clipLag || 750;


	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}

function volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
	  var sum = 0;
    var x;


    for (var i=0; i<bufLength; i++) {
    	x = buf[i];
    	if (Math.abs(x)>=this.clipLevel) {
    		this.clipping = true;
    		this.lastClip = window.performance.now();
    	}
    	sum += x * x;
    }


    var rms =  Math.sqrt(sum / bufLength);

    this.volume = Math.max(rms, this.volume*this.averaging);
}
