import * as pageOperations from "./settings.js";

describe("timeAdvance tests", () => {
  let minuteDisplay;
  let secondDisplay;

  beforeEach(() => {
    minuteDisplay = document.getElementById("minute");
    secondDisplay = document.getElementById("seconds");

    pageOperations.stopButton();
    pageOperations.resetButton();
  });

  test("Does timeAdvance correctly change the timer display", () => {
    expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe("2500");

    pageOperations.timeAdvance();

    for (let min = 24; min > 9; min--) {
      for (let sec = 59; sec > 9; sec--) {
        expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe(
          String(min) + String(sec)
        );

        pageOperations.timeAdvance();
      }
      for (let sec = 9; sec > -1; sec--) {
        expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe(
          String(min) + "0" + String(sec)
        );

        pageOperations.timeAdvance();
      }
    }
    for (let min = 9; min > 0; min--) {
      for (let sec = 59; sec > 9; sec--) {
        expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe(
          "0" + String(min) + String(sec)
        );

        pageOperations.timeAdvance();
      }
      for (let sec = 9; sec > -1; sec--) {
        expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe(
          "0" + String(min) + "0" + String(sec)
        );

        pageOperations.timeAdvance();
      }
    }
  });
});

describe("Mixed Button tests", () => {
  let mixBut;

  beforeEach(() => {
    pageOperations.stopButton();
    pageOperations.resetButton();
    jest.useFakeTimers();

    mixBut = document.getElementById("mixBut");
  });

  test("Does the start button become a stop button", () => {
    pageOperations.startButton();

    expect(mixBut.style.background).toBe("indianred");
    expect(mixBut.value).toBe("Stop");

    jest.advanceTimersByTime(5000);
    expect(document.getElementById("seconds").innerHTML).toBe("55");
  });

  test("Does the stop button become a start button", () => {
    pageOperations.startButton();
    pageOperations.stopButton();

    expect(mixBut.style.background).toBe("lightgreen");
    expect(mixBut.value).toBe("Start Timer");

    jest.advanceTimersByTime(5000);
    expect(document.getElementById("seconds").innerHTML).toBe("00");
  });
});
