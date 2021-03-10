var currentTask = null;

sessionStorage.setItem("completed", "[]");


/**
 * select task or start timer
 */
function startPressed() {
    var task = document.getElementById("current-task").innerHTML;
    var prompt = document.getElementById("select-task");
    if (task === "Current Task") {
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

function selectTask(el) {
    document.getElementById("current-task").innerHTML = "Current Task: " + el.innerHTML;
    currentTask = el;
}

/**
 * call when timer done
 * @param {*} el 
 */
function completedTask(el) {
    var pomo = el.nextElementSibling.nextElementSibling;

    var tasks = JSON.parse(sessionStorage.getItem("completed"));
    var task = {
        "task" : el.innerHTML,
        "pomo" : pomo.value
    };
    tasks.push(task);
    sessionStorage.setItem("completed", JSON.stringify(tasks));

    var remove = pomo.nextElementSibling.nextElementSibling;
    remove.click();
    document.getElementById("current-task").innerHTML = "Current Task";
    currentTask = null;
}
