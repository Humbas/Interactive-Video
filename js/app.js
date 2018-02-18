// on load 

window.onload = function() {
	
	//global variables
	
	// load videos
	var video = document.getElementById("video");
	
	//play, pause vide
	var play = document.getElementById("play");
	
	// mute video
    var mute = document.getElementById("mute");
	
	// fullscreen
	var full = document.getElementById("fullscreen");
	
	// captions control
	var captions = document.getElementById("caption");
	
	// volume control
	var volumeup = document.getElementById("volume-up");
    var volumedown = document.getElementById("volume-down");
	
	
	// video progression
	var progressBar = document.getElementById("progressing");
    var bufferedBar = document.getElementById("buffering"); 
	
	// rewind 10
	var rewind10 = document.getElementById("rewind");
	
	// hightlight text upon video
    var text = document.getElementById("textmove");
	
	
	// arrays to store caption text and show it in the page during video, the arrays have the exact timing as caption.vtt
	   var textarrays = [
          {"start": "0.01","end": "4.130","text": "Now that we've looked at the architecture of the internet, let's see how you might"},
		  {"start": "4.131","end": "7.535","text": "connect your personal devices to the internet inside your house."},
          {"start": "7.536","end": "11.270","text": "Well there are many ways to connect to the internet, and"},
		  {"start": "11.271","end": "13.960","text": "most often people connect wirelessly."},
          {"start": "13.961","end": "17.940","text": "Let's look at an example of how you can connect to the internet."},
          {"start": "17.941","end": "22.370","text": "If you live in a city or a town, you probably have a coaxial cable for"},
          {"start": "22.371","end": "26.880","text": "cable Internet, or a phone line if you have DSL, running to the outside of"},
		  {"start": "28.881","end": "30.920","text": "your house, that connects you to the Internet Service Provider, or ISP."},
		  {"start": "32.100","end": "34.730","text": "If you live far out in the country, you'll more likely have"},
		  {"start": "34.731","end": "39.430","text": "a dish outside your house, connecting you wirelessly to your closest ISP, or"},
		  {"start": "39.431","end": "41.190","text": "you might also use the telephone system."}, 
		  {"start": "42.350","end": "46.300","text": "Whether a wire comes straight from the ISP hookup outside your house, or"}, 
		  {"start": "46.301","end": "49.270","text": "it travels over radio waves from your roof,"},     
		  {"start": "49.271","end": "53.760","text": "the first stop a wire will make once inside your house, is at your modem."}, 
		  {"start": "53.761","end": "57.780","text": "A modem is what connects the internet to your network at home."},    
		  {"start": "57.781","end": "59.000","text": "A few common residential modems are DSL or..."},         
				  
        ];
		
		
	
	
	// functions followed by theire event listeners
	


	  
	//Creates the content to be highlighted
        function createContent() {
			//apply a span element to each caption sentence, gathers them all and display on page
            var sentences;
            for (var i = 0; i < textarrays.length; i++) {
                sentences = document.createElement('span');
                sentences.cue = textarrays[i];
                sentences.innerText = textarrays[i].text + " ";
                text.appendChild(sentences);
            }
        }
		
      createContent();
	  
	   // This function relates video current time with the sentences of caption and text arrays, upon maching it applies a active class to highlight
		    video.addEventListener("timeupdate", function(e) {
            textarrays.forEach(function(element, index, array){
                if( video.currentTime >= element.start && video.currentTime <= element.end )
                    text.children[index].classList.remove("inactive-text");
                    text.children[index].classList.add("active-text");
                    if (video.currentTime < element.start || video.currentTime > element.end) {
                        text.children[index].classList.remove("active-text");
                        text.children[index].classList.add("inactive-text");  
                    } 
            });
        });
	  
	  
	  //video functions controls
		
	 // Play, Pause Video
	   // this funtion activates, pauses video, switch to proper button image
	  function Play() {
            if (video.paused === true) {
            	video.play();
                document.getElementById("play-icon").src = "icons/pause-icon.png";
            } else {
                video.pause();
                //Update button img to Play icon
                document.getElementById("play-icon").src = "icons/play-icon.png";
            }
        }
		
		 play.addEventListener("click", Play);
	 
	 
	 
	 // Mute
	 // this function activates, disactivates video sound, switches image icon
	 function Mute(){
		    if (video.muted === false) {
        		video.muted = true;
            document.getElementById("mute-icon").src = "icons/volume-off-icon.png";
        	} else {
        		video.muted = false;
                document.getElementById("mute-icon").src = "icons/volume-on-icon.png";
        	}
       }
	   
	   mute.addEventListener("click", Mute);
	
	
	//FullScreen
	// activates requestfullscreen function,for IE, for Chrome, Firefox, the function name changes upon browser
	
	function FullScreen(){
		// IE
		if(video.requestFullScreen){
		video.requestFullScreen();	
		//firefox
		} else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();	
		} else{
		 // chrome
		 video.webkitRequestFullScreen();
		}
	}
	
	full.addEventListener("click", FullScreen);
	

		
		  //  Captions control
		// function looks at textTracks[] array and check if is activated, if it is hides it by user action and switches icon
        function Cap() {
            if (video.textTracks[0].mode == "showing") {
           video.textTracks[0].mode = "hidden";
                document.getElementById("caption-icon").src = "icons/closed-caption-off-icon.png";
            } else {
            	video.textTracks[0].mode = "showing";
                document.getElementById("caption-icon").src = "icons/closed-caption-icon.png";
            }    
        }
	
captions.addEventListener("click", Cap);


// Volume control, the functions pretty speaks for themselves

function volup() {
            video.volume+=0.3;
        }
        
        function voldown() {
            video.volume-=0.3;
        }
		
		volumeup.addEventListener("click", volup);
        volumedown.addEventListener("click", voldown);
		
		
		
		// control progression bar
		
		 //video´s time
         function presentTime() {
            var video = document.getElementById("video");
            var minutes = parseInt(video.currentTime / 60, 10); 
            var seconds = parseInt(video.currentTime % 60, 10);
            if (seconds < 10) {
                seconds = "0" + parseInt(video.currentTime % 60, 10); 
            }
            return minutes + ":" + seconds;
        }
           //update time, goes to current time id and upates value 
             video.ontimeupdate = function() {
                 document.getElementById("current-time").innerHTML = presentTime();
             };
		
			 
	
		
		
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
        
        function Progress() {
    		var value = (100 / video.duration) * video.currentTime;
    		progressBar.value = value;
        }
        
        function buffering() {
    		var value = (100 / video.duration) * video.buffered.end(0);
    		bufferedBar.value = value;
        }
		
		 video.addEventListener("timeupdate", Progress);
         video.addEventListener("timeupdate", buffering);
		


// lets rewind 10 seconds, bare in mind that the function only subtracts 10 to currentTime so we could rewing any value  we want to

 function rewind() {
            video.currentTime = video.currentTime - 10;
        }
	rewind10.addEventListener("click",rewind);


	
	
	
}

// on load