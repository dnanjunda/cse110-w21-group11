
const pageContent = 
    '<span id="minute">25</span>' + 
    '<span id="seconds">00</span>' +
    '<p id="completePomos"> Number of Complete Pomodors </p>' +
    '<input type="button" id="mixBut" style="background-color:lightgreen;color:white;width:150px;height:40px;" value="Start Timer" />' + 
    '<button id="reset-btn" style="background-color:gray;color:white;width:150px;height:40px;">Reset</button>' +
    '<div id="settings-modal" class="modal"></div>' +
    '<input type="number" placeholder="Minutes" class="minutes" id="userMins" />' +
    '<input type="number" placeholder="Seconds" class="seconds" min="0" step="1" id="userSecs" />' +
    '<input id="volume-number" name="volume-number" type="number" min="0" max="100" value="100">' +
    '<input id="volume-slider" name="volume-slider" type="range" min="0" max="100" value="100">' +
    '<input type="number" placeholder="Breaks" class="pomos" id="shortBreakPomos" />' +
    '<input type="number" placeholder="Pomos" class="pomos" id="userPomos" />' +
    '<input type="number" placeholder="Breaks" class="pomos" id="breakPomos" />' +
    '<select id="changeSelect" name="alarmMusic" onselect="sound()">';
document.body.innerHTML = pageContent;

const pageOperations = require('./settings');

describe('timeAdvance tests', () => {
    let minuteDisplay;
    let secondDisplay;

    beforeEach(() => {
        document.body.innerHTML = pageContent;
        
        minuteDisplay = document.getElementById("minute");
        secondDisplay = document.getElementById("seconds");
    })

    test('Does timeAdvance correctly change the timer display', () => {
        expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe('2500');

        pageOperations.timeAdvance();

        for(let min = 24; min > 9; min--) {
            for(let sec = 59; sec > 9; sec--) {
                expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe(String(min) + String(sec));
                
                pageOperations.timeAdvance();
            }
            for(let sec = 9; sec > -1; sec--) {
                expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe(String(min) + '0' + String(sec));
                
                pageOperations.timeAdvance();
            }
        }
        for(let min = 9; min > 0; min--) {
            for(let sec = 59; sec > 9; sec--) {
                expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe('0' + String(min) + String(sec));
                
                pageOperations.timeAdvance();
            }
            for(let sec = 9; sec > -1; sec--) {
                expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe('0' + String(min) + '0' + String(sec));
                
                pageOperations.timeAdvance();
            }
        }
    });
});

describe('Mixed Button tests', () => {
    let mixBut;

    beforeEach(() => {
        document.body.innerHTML = pageContent;

        jest.useFakeTimers();

        mixBut = document.getElementById("mixBut");
    });

    test('Does the start button become a stop button', () => {
        pageOperations.startButton();

        expect(mixBut.style.background).toBe("indianred");
        expect(mixBut.value).toBe('Stop');

        jest.advanceTimersByTime(5000);
        expect(document.getElementById(seconds).innerHTML).toBe('55');
    });

    test('Does the stop button become a start button', () => {
        pageOperations.startButton();
        pageOperations.stopButton();

        expect(mixBut.style.background).toBe("lightgreen");
        expect(mixBut.value).toBe('Start Timer');

        jest.advanceTimersByTime(5000);
        expect(document.getElementById('seconds').innerHTML).toBe('00');
    });
});