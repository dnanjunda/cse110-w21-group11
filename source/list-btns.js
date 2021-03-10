import { Task } from "./task-list.js";

/* eslint no-undef: "error" */
const myStorage = window.localStorage;
const taskList = document.getElementById("tasks");

window.addEventListener("DOMContentLoaded", () => {
  if (!myStorage.getItem("tasks")) {
    myStorage.setItem("tasks", "[]");
  }
  const tasks = JSON.parse(myStorage.getItem("tasks"));
  if (tasks.length > 0) {
    document.getElementById("no-task").style.display = "none";
    for (let i = 0; i < tasks.length; i++) {
      taskList.appendChild(new Task(tasks[i]));
    }
  }
});

// const entName = document.getElementById("task-name");
// entName.addEventListener("keyup", function (e) {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     addTask();
//   }
// });

// const entPomo = document.getElementById("pomo-num");
// entPomo.addEventListener("keyup", function (e) {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     addTask();
//   }
// });

const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

/**
 * Add a new task into the list.
 */
function addTask() {
  const noTask = document.getElementById("no-task");
  const tasks = document.getElementById("tasks");
  const newTask = document.getElementById("task-name").value;
  const newPomo = document.getElementById("pomo-num").value;

  noTask.style.display = "none";

  tasks.appendChild(
    new Task({
      taskName: newTask,
      pomoNum: newPomo,
    })
  );
  document.getElementById("form").reset();

  const storedTasks = JSON.parse(myStorage.getItem("tasks"));
  storedTasks.push({
    taskName: newTask,
    pomoNum: newPomo,
  });
  myStorage.setItem("tasks", JSON.stringify(storedTasks));
}

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function () {
  clearList();
});
/**
 * Clear the current task list.
 */
function clearList() {
  const tasks = document.getElementById("tasks");
  const noTask = document.getElementById("no-task");
  noTask.style.display = "block";
  while (tasks.children.length > 1) {
    tasks.removeChild(tasks.children[1]);
  }
  myStorage.setItem("tasks", "[]");
}

/* eslint-disable no-unused-vars */

/**
 * Increment pomos by 1 when plus button is pressed.
 */
function increment() {
  document.getElementById("pomo-num").stepUp();
}
document.getElementById("plus").onclick = increment;

/**
 * Decrement pomos by 1 when minus button is pressed.
 */
function decrement() {
  document.getElementById("pomo-num").stepDown();
}
document.getElementById("minus").onclick = decrement;

// module.exports.addTask = addTask;
// module.exports.clearList = clearList;
