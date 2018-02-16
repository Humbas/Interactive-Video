// JavaScript Document
window.onload = function() {
	
	var video = document.getElementById("video");
	
    var play = document.getElementById("play-pause");
    var mute = document.getElementById("mute");
    var fullButton = document.getElementById("full-screen");
    var captionButton = document.getElementById("caption");
    var volumeUpButton = document.getElementById("volume-up");
    var volumeDownButton = document.getElementById("volume-down");
    var rewindButton = document.getElementById("rewind");
	
	/* video progression */
    var seekBar = document.getElementById("seek");
    var bufferedBar = document.getElementById("buffered"); 
	
	/* highlight text during video */
    var textTranscript = document.getElementById("transcript");
	
	// arrays to store caption text and show it in the page during video
	   var syncData = [
          {"start": "0.01","end": "7.535","text": "Now that we've looked at the architecture of the internet, let's see how you might connect your personal devices to the internet inside your house."},
          {"start": "7.536","end": "13.960","text": "Well there are many ways to connect to the internet, and most often people connect wirelessly."},
          {"start": "13.961","end": "17.940","text": "Let's look at an example of how you can connect to the internet."},
          {"start": "17.941","end": "30.920","text": "If you live in a city or a town, you probably have a coaxial cable for cable Internet, or a phone line if you have DSL, running to the outside of your house, that connects you to the Internet Service Provider, or ISP."},
          {"start": "32.100","end": "41.190","text": "If you live far out in the country, you'll more likely have a dish outside your house, connecting you wirelessly to your closest ISP, or you might also use the telephone system."},
          {"start": "42.350","end": "53.760","text": "Whether a wire comes straight from the ISP hookup outside your house, or it travels over radio waves from your roof, the first stop a wire will make once inside your house, is at your modem."},
          {"start": "53.761","end": "57.780","text": "A modem is what connects the internet to your network at home."},
          {"start": "57.781","end": "59.000","text": "A few common residential modems are DSL or..."}            
        ];
	
	
	// next we have functions and the respective event listeners that trigger each function upon user action
	
 //Creates the transcript content 
        function createTranscript() {
            var element;
            for (var i = 0; i < syncData.length; i++) {
                element = document.createElement('span');
                element.cue = syncData[i];
                element.innerText = syncData[i].text + " ";
                textTranscript.appendChild(element);
            }
        }
		
			 //reate transcript on page 
      createTranscript();
	  
	  
	  
	   // Play Video
        function playVideo() {
            if (video.paused === true) {
            	video.play();
                document.getElementById("play-pause-icon").src = "icons/pause-icon.png";
            } else {
                video.pause();
                //Update button img to Play icon
                document.getElementById("play-pause-icon").src = "icons/play-icon.png";
            }
        }
		
	 play.addEventListener("click", playVideo);
	 
	 
	  // Mute
        function muteVid() {
            if (video.muted === false) {
        		// Mute the video
        		video.muted = true;
        		// Update the button image to Volume Off
            document.getElementById("mute-icon").src = "icons/volume-off-icon.png";
        	} else {
        		// Unmute the video
        		video.muted = false;
        		// Update the button image to Volume Off
                document.getElementById("mute-icon").src = "icons/volume-on-icon.png";
        	}
        }
		
		mute.addEventListener("click", muteVid); 
		
		
		
  // Full Screen 
        function fullScreen() {
            if (video.requestFullscreen) {
            		video.requestFullscreen();
        	} else if (video.mozRequestFullScreen) {
        		video.mozRequestFullScreen();
        	} else if (video.webkitRequestFullscreen) {
        		video.webkitRequestFullscreen(); // Chrome and Safari
        	}
        }
	
       fullButton.addEventListener("click", fullScreen); 
	   
	   
	  	
        //  Captions control
        function closedCaptions() {
            if (video.textTracks[0].mode == "showing") {
           video.textTracks[0].mode = "hidden";
                document.getElementById("caption-icon").src = "icons/closed-caption-off-icon.png";
            } else {
            	video.textTracks[0].mode = "showing";
                document.getElementById("caption-icon").src = "icons/closed-caption-icon.png";
            }    
        }
		captionButton.addEventListener("click", closedCaptions);
		
		
		 //video in min/sec
         function currentTime() {
            var video = document.getElementById("video");
            var minutes = parseInt(video.currentTime / 60, 10);
            var seconds = parseInt(video.currentTime % 60, 10);
            if (seconds < 10) {
                seconds = "0" + parseInt(video.currentTime % 60, 10); //leading zero
            }
            return minutes + ":" + seconds;
        }
            //update time
             video.ontimeupdate = function() {
                 document.getElementById("current-time").innerHTML = currentTime();
             };
		
		
		 //duration min/sec, a minute is 60 sec
        function duration() {
            var video = document.getElementById("video");
            var minutes = parseInt(video.duration / 60, 10);
            var seconds = parseInt(video.duration % 60);
            return minutes + ":" + seconds;
        }
        
        function seekProgress() {
    		var value = (100 / video.duration) * video.currentTime;
    		seekBar.value = value;
        }
        
        function bufferProgress() {
    		var value = (100 / video.duration) * video.buffered.end(0);
    		bufferedBar.value = value;
        }
		
		 video.addEventListener("timeupdate", seekProgress);
         video.addEventListener("timeupdate", bufferProgress);
		 
		 
		 
		  //Volume
        function volumeUp() {
            video.volume+=0.1;
        }
        
        function volumeDown() {
            video.volume-=0.1;
        }
		
		volumeUpButton.addEventListener("click", volumeUp);
        volumeDownButton.addEventListener("click", volumeDown);
		
		
	
		 
		 // changing cue upon video frame, transcript
		    video.addEventListener("timeupdate", function(e) {
            syncData.forEach(function(element, index, array){
                if( video.currentTime >= element.start && video.currentTime <= element.end )
                    textTranscript.children[index].classList.remove("inactive-text");
                    textTranscript.children[index].classList.add("active-text");
                    if (video.currentTime < element.start || video.currentTime > element.end) {
                        textTranscript.children[index].classList.remove("active-text");
                        textTranscript.children[index].classList.add("inactive-text");  
                    } 
            });
        });
         
        //Rewinds time
        function rewind() {
            video.currentTime = video.currentTime - 20;
        }
		 rewindButton.addEventListener("click", rewind);
		 
	
	
		// moving text upon video time
		function textJump(e) {
             video.currentTime = e.target.cue.start;
             video.play();
         }
		 
	      //activate Jumptext upon click
            var sentences = textTranscript.getElementsByTagName('span');
            for (var i = 0; i < sentences.length; i++) {
                sentences[i].addEventListener("click", textJump); //Call textJump function
            }
	
}; // window