import { canChangeTask } from "./settings.js";

let currentTask = null;

window.addEventListener("DOMContentLoaded", () => {
  if (!window.localStorage.getItem("completed")) {
    window.localStorage.setItem("completed", "[]");
  } else {
    const completedTasks = JSON.parse(window.localStorage.getItem("completed"));
    const length = completedTasks.length;
    for (let i = 0; i < length; i++) {
      const task = document.createElement("div");
      task.setAttribute("id", "stats-task");
      task.innerHTML = completedTasks[i].task;
      const completedTaskPomo = document.createElement("div");
      completedTaskPomo.setAttribute("id", "stats-pomo");
      completedTaskPomo.innerHTML = completedTasks[i].pomo;
      document.getElementById("completed-tasks").appendChild(task);
      document.getElementById("completed-tasks").appendChild(completedTaskPomo);
    }
  }

  if (!window.localStorage.getItem("completePomos")) {
    window.localStorage.setItem("completePomos", 0);
  } else {
    const numPomos = window.localStorage.getItem("completePomos");
    document.getElementById("completePomos").innerHTML =
      "Completed Pomodoros: " + numPomos;
  }

  document.getElementById("clear-btn").addEventListener("click", () => {
    window.localStorage.setItem("completed", "[]");
    window.localStorage.setItem("completePomos", 0);
    document.getElementById("completePomos").innerHTML =
      "Completed Pomodoros: 0";
    while (document.getElementById("completed-tasks").firstChild) {
      document
        .getElementById("completed-tasks")
        .removeChild(document.getElementById("completed-tasks").firstChild);
    }
  });
});

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
    const currentPomo = currentTask.nextElementSibling.nextElementSibling.value;
    if (initialPomo < currentPomo) {
      initialPomo = currentPomo;
    }
  }
}

let initialPomo = 0;

/**
 * call when timer done
 */
export function completedTask() {
  // pomo is the element representing the number of pomos remaining for the task
  const pomo = currentTask.nextElementSibling.nextElementSibling;

  // If the task is completed
  if (pomo.value < 2) {
    const tasks = JSON.parse(window.localStorage.getItem("completed"));
    const task = {
      task: currentTask.innerHTML,
      pomo: pomo.value,
    };
    tasks.push(task);
    window.localStorage.setItem("completed", JSON.stringify(tasks));

    const numPomos = window.localStorage.getItem("completePomos");
    const disPomos = parseInt(numPomos) + parseInt(pomo.value);
    document.getElementById("completePomos").innerHTML =
      "Completed Pomodoros: " + disPomos;
    window.localStorage.setItem("completePomos", disPomos);

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
