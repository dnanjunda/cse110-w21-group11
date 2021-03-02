var twentyfiveMinutes = 25;
//var twentyfiveMinutes = 2;
var pomodoro = 1;


//Timer Functions
    let minute = 0;
    let seconds = 0;
    let totalSeconds = twentyfiveMinutes;
    
    let intervalId = null;
    
    function startTimer() {
        --totalSeconds;
        seconds = Math.floor(totalSeconds % 60);
        minute = Math.floor((totalSeconds / 60) % 60);
        minute = minute < 10 ? "0" + minute : minute;
        seconds = seconds < 10 ? "0" + seconds : seconds;
    
      document.getElementById("minute").innerHTML = minute;
      document.getElementById("seconds").innerHTML = seconds;
      if(totalSeconds == 0){
          totalSeconds = twentyfiveMinutes;
          clearInterval(intervalId);
          sound();
      }
    }

    var mixBut = document.getElementById("mixBut");
    mixBut.addEventListener("click", startButton);
    var resetTimer = document.getElementById("reset-btn");
    resetTimer.addEventListener("click", resetButton);

    function startButton(){
        intervalId = setInterval(startTimer, 1000);
        console.log("Started");
        mixBut.removeEventListener("click", startButton);
        mixBut.addEventListener("click", stopButton);
        document.getElementById("mixBut").style.background = "indianred";
        mixBut.value = "Stop Timer";
    }
    
    function stopButton(){
        if (intervalId){
            clearInterval(intervalId);
        }
        console.log("Stopped");
        mixBut.removeEventListener("click", stopButton);
        mixBut.addEventListener("click", startButton);
        document.getElementById("mixBut").style.background = "lightgreen";
        mixBut.value = "Start Timer";
    }

    function resetButton(){
       totalSeconds = twentyfiveMinutes;
       document.getElementById("minute").innerHTML = '00';
       document.getElementById("seconds").innerHTML = '00';
    }

    /* a function to set a timer by way of inputtable number
    function setTimer(){
        totalSeconds = twentyfiveMinutes;
        document.getElementById("minute").innerHTML = '00';
        document.getElementById("seconds").innerHTML = '00';
     }
     */




// Task List Functions
(function(){

  var todo = document.querySelector( '#tasks' ),
      form = document.querySelector( 'form' ),
      field = document.querySelector( '#newitem' );
    
  form.addEventListener( 'submit', function( event ) {
    var text = field.value;
    if ( text !== '' ) {
      todo.innerHTML += '<li>' + text +
        ' <button onclick="Check(this);">check as done</button> <button onclick="Delete(this);">X</button> </li>';
      field.value = '';
    }
    event.preventDefault();
  }, false);

})();
 
function Check(curr){
    curr.parentNode.innerHTML = "✓ " + curr.parentNode.innerHTML;
}

function Delete(curr){
    curr.parentNode.parentNode.removeChild(curr.parentNode);    
}

var listClear = document.getElementById("clearList");

listClear.addEventListener("click", noList);

function noList(){
    var ul = document.getElementById("tasks");
    ul.innerHTML = "";
}

//Notfication Sound Functions
function sound(){
    var x = document.getElementById("changeSelect").value;
    var volLevel = document.getElementById("volume-slider").value / 100;
    if(x == "Google"){
        var audio1 = new Audio('./assets/media/audio/google.mp3');
        audio1.volume = volLevel;
        audio1.play();
    }
    else if(x == "iPhone"){
        var audio2 = new Audio('./assets/media/audio/iphone.mp3');
        audio2.volume = volLevel;
        audio2.play();
    }
    else if(x == "Mario"){
        var audio3 = new Audio('./assets/media/audio/mario.mp3');
        audio3.volume = volLevel;
        audio3.play();
    }
}

/* please add function to stop sound if you can, not necessary
var mute = document.getElementById("StopSound");
mute.addEventListener("click", stopSound);

function stopSound(){
    audio.pause();
}
*/

var slider = document.getElementById("volume-slider");
var numInp = document.getElementById("volume-number");

slider.oninput = function(){
    document.getElementById("volume-number").value = document.getElementById("volume-slider").value;
}  

numInp.oninput = function(){
    document.getElementById("volume-slider").value = document.getElementById("volume-number").value;
}