import * as buttonFunctions from "./list-btns.js";

document.getElementById('plus').onclick = buttonFunctions.increment;
document.getElementById('minus').onclick = buttonFunctions.decrement;

describe("Number of Pomos Button Tests", () => {
    let pomoNum;

    beforeEach(() => {
        pomoNum = document.getElementById("pomo-num");
    })

    test("Pomodoro increment button", () => {
        let currVal = pomoNum.value;
        document.getElementById("plus").click();
        expect(pomoNum.value).toBe(currVal + 1);
    });

    test("Pomodoro decrement button", () => {
        let oldVal = pomoNum.value;
        document.getElementById("minus").click();
        expect(pomoNum.value).toBe(oldVal - 1);
    });

    // test("Clear task list button", () => {

    // });

    // test("Add task to list button", () => {

    // });

})
