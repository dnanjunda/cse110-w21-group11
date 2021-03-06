import * as pageOperations from "./settings.js";

describe("timeAdvance tests", () => {
  let minuteDisplay = document.getElementById("minute");
  let secondDisplay = document.getElementById("seconds");

  afterEach(() => {
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
  let mixBut = document.getElementById("mixBut");

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    pageOperations.stopButton();
    pageOperations.resetButton();
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

describe("Break tests", () => {
    let minuteDisplay = document.getElementById("minute");
    let secondDisplay = document.getElementById("seconds");

    beforeEach(() => {
      jest.useFakeTimers();
    });
  
    afterEach(() => {
      pageOperations.stopButton();
      pageOperations.resetButton();
    });

    test("Does the timer stop counting down after 25 minutes", () => {
        pageOperations.startButton();

        expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe('2500');

        jest.advanceTimersByTime(25 * 60000 + 1000);

        expect(minuteDisplay.innerHTML + secondDisplay.innerHTML).toBe('0000');
    });
});