/* global Task */
/* eslint no-undef: "error" */
const entName = document.getElementById("task-name");
entName.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

const entPomo = document.getElementById("pomo-num");
entPomo.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

const form = document.getElementById("form");
form.addEventListener("submit",function(e){
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
  
  tasks.appendChild(new Task({
    taskName: newTask,
    pomoNum: newPomo,
  }));
  document.getElementById("form").reset();
}

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click",function(){
  clearList();
});
/**
 * Clear the current task list.
 */
function clearList() {
  const taskList = document.getElementById("tasks");
  const noTask = document.getElementById("no-task");
  noTask.style.display = "block";
  while (taskList.children.length > 1) {
    taskList.removeChild(taskList.children[1]);
  } 
}

/**
 * Increment pomos by 1 when plus button is pressed.
 */
function increment(){
  document.getElementById("pomo-num").stepUp();

}

/**
 * Decrement pomos by 1 when plus button is pressed.
 */
function decrement(){
  document.getElementById("pomo-num").stepDown();

}

// module.exports.addTask = addTask;
// module.exports.clearList = clearList;
