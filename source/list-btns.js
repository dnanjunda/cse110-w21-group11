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

const addButton = document.getElementById("add");
addButton.addEventListener("click",function(){
  addTask();
});

/**
 * Add a new task into the list.
 */
function addTask() {
  const noTask = document.getElementById("no-task");
  const tasks = document.getElementById("tasks");
  const taskList = document.getElementById("task-list");

  const taskName = document.getElementById("task-name");
  const pomoNum = document.getElementById("pomo-num");

  noTask.style.display = "none";

  
  let newTask = taskName.value;
  let newPomo = pomoNum.value;

  if(newTask == null || newTask == "") {
    newTask = "New Task";
  }
  if(newPomo == null || newPomo == "") {
    newPomo = "1";
  }

  const task = {
    taskName: newTask,
    pomoNum: newPomo,
  };
  
  tasks.appendChild(new Task(task));
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
  const tasks = document.getElementById("tasks");
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

function decrement(){
  document.getElementById("pomo-num").stepDown();

}
