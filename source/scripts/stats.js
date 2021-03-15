import { canChangeTask } from "./settings.js";

let currentTask = null;

window.sessionStorage.setItem("completed", "[]");

/**
 * select task or start timer
 */
export function isTaskSelected() {
  const task = document.getElementById("current-task").innerHTML;
  const prompt = document.getElementById("select-task");
  if (task === "Current Task: None") {
    prompt.style.display = "block";
    return false;
  } else {
    // function to start timer
    prompt.style.display = "none";
    return true;
  }
}
/**
 * store incomplete tasks
 */

export function selectTask(el) {
  if (canChangeTask()) {
    document.getElementById("current-task").innerHTML =
      "Current Task: " + el.innerHTML;
    currentTask = el;
    var currentPomo = currentTask.nextElementSibling.nextElementSibling.value;
    if (initialPomo < currentPomo) {
      initialPomo = currentPomo;
    }
  }
}

var initialPomo = 0;

/**
 * call when timer done
 */
export function completedTask() {
  // pomo is the element representing the number of pomos remaining for the task
  const pomo = currentTask.nextElementSibling.nextElementSibling;

  // If the task is completed
  if (pomo.value < 2) {
    // Remove it from the task list
    const tasks = JSON.parse(window.sessionStorage.getItem("completed"));
    const task = {
      task: currentTask.innerHTML,
      pomo: pomo.value,
    };
    tasks.push(task);
    window.sessionStorage.setItem("completed", JSON.stringify(tasks));

    // remove is the delete button
    const remove = pomo.nextElementSibling.nextElementSibling;
    remove.click();

    // Add it to the completed task list
    const completedTask = document.createElement("div");
    completedTask.setAttribute("id", "stats-task");
    completedTask.innerHTML = currentTask.innerHTML;
    const completedTaskPomo = document.createElement("div");
    completedTaskPomo.setAttribute("id", "stats-pomo");
    completedTaskPomo.innerHTML = initialPomo;
    document.getElementById("completed-tasks").appendChild(completedTask);
    document.getElementById("completed-tasks").appendChild(completedTaskPomo);

    // Resetting
    currentTask = null;
    initialPomo = 0;
  }
  // If the task is not yet completed
  else {
    // The user has made progress on the current task, so the number of pomo sessions remaining is decremented
    pomo.value -= 1;

    // Updating the number of pomos remaining in local storage
    const array = pomo.getRootNode().host.parentNode.children;
    const index = [].indexOf.call(array, pomo.getRootNode().host) - 1;
    const storedTasks = JSON.parse(window.localStorage.getItem("tasks"));
    storedTasks.splice(index, 1, {
      taskName: currentTask.textContent,
      pomoNum: pomo.value,
    });
    window.localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }
}
