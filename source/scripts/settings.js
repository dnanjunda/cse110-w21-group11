//TODOs:
/* 
- Settings modal not responsive to window size
- Custom minutes and seconds don’t work together (only changing one of them works at a time)
  - messes up if secs is inputted before mins
- When the goal for number of pomodoros for long break is reached, alert for both short break and long break both alert
- Having short and long breaks not freeze the timer
- Add JSDoc comments
- Unit testing

- Jonathan working on resizing the settings modal, as well as tweaking CSS and making HTML more readable
- Arela working on custom minutes and seconds. Can't really get it to work properly
- Brian will help Arela with custom minutes and seconds. Separate the short break and long break alert

*/

/* 
 * Timer function
 */

var pomodoro = 0;
var twentyfiveMinutes = 60 * 25;
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
    if(totalSeconds <= 0){ 
        pomodoro++;
        totalSeconds = twentyfiveMinutes;
        clearInterval(intervalId);
        document.getElementById("completePomos").innerHTML = "Number of Complete Pomodoros: " + pomodoro;
        sound();
    }

    let pomoBreak = document.getElementById("userPomos").value
    let pomoBreakLength = document.getElementById("breakPomos").value

    if(pomodoro % pomoBreak == 0 && pomodoro != 0){ //TODO: timer not starting anymore
        alert("Time to take a break");
        var longBreak = 60 * pomoBreakLength;
        totalSeconds = longBreak;
        clearInterval(intervalId);
        startTimer();
    }
}

var resetTimer = document.getElementById("reset-btn");
resetTimer.addEventListener("click", resetButton);


var mixBut = document.getElementById("mixBut");
mixBut.addEventListener("click", startButton);
function startButton(){
    intervalId = setInterval(startTimer, 1000);
    console.log("Started");
    mixBut.removeEventListener("click", startButton);
    mixBut.addEventListener("click", stopButton);
    document.getElementById("mixBut").style.background = "indianred";
    mixBut.value = "Stop";
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
function resetButton(){ //TODO: messes up secs if inputted before mins
    totalSeconds = twentyfiveMinutes;
    //minutes
    if(inputMins.value == ""){
        document.getElementById("minute").innerHTML = '25';
    }
    else if(inputMins.value == "0"){
        document.getElementById("minute").innerHTML = '00';
    }
    else if(inputMins.value < 10){
        document.getElementById("minute").innerHTML = '0' + inputMins.value;
    }
    else{
        document.getElementById("minute").innerHTML = inputMins.value;
    }
    document.getElementById("seconds").innerHTML = '00';
    //seconds
    if(inputSecs.value == "" || inputSecs.value == "0" ){
        document.getElementById("seconds").innerHTML = '00';
    }
    else if(inputSecs.value < 10){
        document.getElementById("seconds").innerHTML = '0' + inputSecs.value;
    }
    else{
        document.getElementById("seconds").innerHTML = inputSecs.value;
    }
}



/*
 * Settings Modal
 */


// Get the modal
var modal = document.getElementById("settings-modal");

// Get the button that opens the modal
var btn = document.getElementById("settings-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// var twentyfiveMinutes = 60 * 1;


document.getElementById("completePomos").innerHTML = "Number of Complete Pomodoros: " + pomodoro;
var inputMins = document.getElementById("userMins");
// TODO: custom seconds(?)
// var inputSecs = document.getElementById("userSecs");
inputMins.oninput = function(){
    Stop(); //so that there's no overlapping timers
    indexMins = 0;
    // doesnt allow for custom timer to start with a 0 and more numbers
    if(inputMins.value.length > 1){
        while(inputMins.value.substring(indexMins, indexMins + 1) == "0"){
            indexMins++;
        }
    }
    inputMins.value = inputMins.value.substring(indexMins);
    if(inputMins.value == ""){
        document.getElementById("minute").innerHTML = '25';
        let normal = 25;
        twentyfiveMinutes = 60 * normal;
    }
    else if(inputMins.value == "0"){
        document.getElementById("minute").innerHTML = '00';
        twentyfiveMinutes = 0;
    }
    else if(inputMins.value < 10){
        document.getElementById("minute").innerHTML = '0' + inputMins.value;
        twentyfiveMinutes = 60 * inputMins.value;
    }
    else{
        document.getElementById("minute").innerHTML = inputMins.value;
        twentyfiveMinutes = 60 * inputMins.value;
    }
    document.getElementById("seconds").innerHTML = '00';
    // minute = 0;
    // seconds = 0;
    totalSeconds = twentyfiveMinutes;
    intervalId = null;
}

// TODO: custom seconds
var inputSecs = document.getElementById("userSecs");
inputSecs.oninput = function(){
  Stop(); //so that there's no overlapping timers
  indexSecs = 0;
  // doesnt allow for custom timer to start with a 0 and more numbers
  if(inputSecs.value.length > 1){
      while(inputSecs.value.substring(indexSecs, indexSecs + 1) == "0"){
          indexSecs++;
      }
  }
  inputSecs.value = inputSecs.value.substring(indexSecs);
  if(inputSecs.value == "" || inputSecs.value == "0"){
      document.getElementById("seconds").innerHTML = '00';
  }
  else if(inputSecs.value < 10){
      document.getElementById("seconds").innerHTML = '0' + inputSecs.value;
      twentyfiveMinutes = (60 * inputMins.value) + inputSecs.value;
  }
  else{
      document.getElementById("seconds").innerHTML = inputSecs.value;
      twentyfiveMinutes = (60 * inputMins.value) + inputSecs.value;
  }
  // document.getElementById("seconds").innerHTML = '00';
  // // minute = 0;
  // // seconds = 0;
  totalSeconds = twentyfiveMinutes;
  intervalId = null;
}

/*
* Notfication Sound Functions
*/
function sound(){
    var x = document.getElementById("changeSelect").value;
    var volLevel = document.getElementById("volume-slider").value / 100;
    if(x == "Chirp"){
        var audioSound = new Audio('https://freesound.org/data/previews/456/456440_5121236-lq.mp3');
        audioSound.volume = volLevel;
    }
    else if(x == "Alarm-Clock"){
        var audioSound = new Audio('https://freesound.org/data/previews/219/219244_4082826-lq.mp3');
        audioSound.volume = volLevel;
    }
    else if(x == "None"){
        var audioSound = new Audio('https://freesound.org/data/previews/219/219244_4082826-lq.mp3');
        audioSound.volume = 0;
    }
    // infinite loop
    audioSound.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    audioSound.play();
    //Stop alarm sound
    document.getElementById("mixBut").onclick = function(event) {stopAlarm()}; //stop alarm when press stop
    document.getElementById("reset-btn").onclick = function(event) {stopAlarm()}; //stop alarm when press reset
    function stopAlarm() {
        if(audioSound){
            audioSound.pause();
            audioSound.currentTime = 0;
        }
    }
}
var slider = document.getElementById("volume-slider");
var numInp = document.getElementById("volume-number");
slider.oninput = function(){
    document.getElementById("volume-number").value = document.getElementById("volume-slider").value;
}  
numInp.oninput = function(){
    document.getElementById("volume-slider").value = document.getElementById("volume-number").value;
}





/*
* Task List functions
*/
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
if(curr.parentNode.innerHTML.charAt(0) == "✓"){
    curr.parentNode.innerHTML= curr.parentNode.innerHTML.substring(1);
}
else{
    curr.parentNode.innerHTML = "✓" + curr.parentNode.innerHTML;
}
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