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


let secondsPerPomo = 60 * 25;           // Number of seconds in single pomo session
let timeRemaining = secondsPerPomo;     // Time remaining in session in seconds
let pomodoro = 0;                       // Number of pomodoros completed
let intervalId = null;                  // ID of interval calling the timeAdvance method



/**
 * This function advances time by one second. It will be called by setInterval in startButton
 */
function timeAdvance() {
    --timeRemaining;

    let minute = Math.floor((timeRemaining / 60) % 60);
    let seconds = Math.floor(timeRemaining % 60);
    minute = minute < 10 ? "0" + minute : minute;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("minute").innerHTML = minute;
    document.getElementById("seconds").innerHTML = seconds;
    if(timeRemaining <= 0){ 
        pomodoro++;
        timeRemaining = secondsPerPomo;
        clearInterval(intervalId);
        document.getElementById("completePomos").innerHTML = "Number of Complete Pomodoros: " + pomodoro;
        sound();
    }

    let pomoBreak = document.getElementById("userPomos").value
    let pomoBreakLength = document.getElementById("breakPomos").value

    if(pomodoro % pomoBreak == 0 && pomodoro != 0){ //TODO: timer not starting anymore
        alert("Time to take a break");
        let longBreak = 60 * pomoBreakLength;
        timeRemaining = longBreak;
        clearInterval(intervalId);
        timeAdvance();
    }
}



/**
 * startButton and stopButton will be called by the start/stop button
 * The single button will swap between the two functions each time one is called
 */
const mixBut = document.getElementById("mixBut");

function startButton(){
    intervalId = setInterval(timeAdvance, 1000);
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
mixBut.addEventListener("click", startButton);



/**
 * resetButton will be linked to the reset button and resets the pomo session
 */
function resetButton(){ //TODO: messes up secs if inputted before mins
    timeRemaining = secondsPerPomo;
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
document.getElementById("reset-btn").addEventListener("click", resetButton);



/*
 * Settings Modal
 */


// When the user clicks anywhere outside of the modal, close it
const modal = document.getElementById("settings-modal");
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



/**
 * Updating timer when the inputMins element in the settings menu changes
 */
const inputMins = document.getElementById("userMins");
inputMins.oninput = function(){
    stopButton(); //so that there's no overlapping timers
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
        secondsPerPomo = 60 * 25;
    }
    else if(inputMins.value == "0"){
        document.getElementById("minute").innerHTML = '00';
        secondsPerPomo = inputSecs.value;
    }
    else if(inputMins.value < 10){
        document.getElementById("minute").innerHTML = '0' + inputMins.value;
        secondsPerPomo = (60 * inputMins.value) + inputSecs.value;
    }
    else{
        document.getElementById("minute").innerHTML = inputMins.value;
        secondsPerPomo = (60 * inputMins.value) + inputSecs.value;
    }
    document.getElementById("seconds").innerHTML = '00';
    timeRemaining = secondsPerPomo;
    intervalId = null;
}



/**
 * Updating timer when the inputSecs element in the settings menu changes
 */
const inputSecs = document.getElementById("userSecs");
inputSecs.oninput = function(){
  stopButton(); //so that there's no overlapping timers
  let indexSecs = 0;
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
      secondsPerPomo = (60 * inputMins.value) + inputSecs.value;
  }
  else{
      document.getElementById("seconds").innerHTML = inputSecs.value;
      secondsPerPomo = (60 * inputMins.value) + inputSecs.value;
  }
  timeRemaining = secondsPerPomo;
  intervalId = null;
}



/*
* Notfication Sound Functions
*/
function sound(){
    let x = document.getElementById("changeSelect").value;
    let volLevel = document.getElementById("volume-slider").value / 100;
    if(x == "Chirp"){
        let audioSound = new Audio('https://freesound.org/data/previews/456/456440_5121236-lq.mp3');
        audioSound.volume = volLevel;
    }
    else if(x == "Alarm-Clock"){
        let audioSound = new Audio('https://freesound.org/data/previews/219/219244_4082826-lq.mp3');
        audioSound.volume = volLevel;
    }
    else if(x == "None"){
        let audioSound = new Audio('https://freesound.org/data/previews/219/219244_4082826-lq.mp3');
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


/**
 * Making sure the volume-number and the volume-slider always match
 */
const slider = document.getElementById("volume-slider");
const numInp = document.getElementById("volume-number");
slider.oninput = function(){
    document.getElementById("volume-number").value = document.getElementById("volume-slider").value;
}  
numInp.oninput = function(){
    document.getElementById("volume-slider").value = document.getElementById("volume-number").value;
}
