var currentTask = null;

sessionStorage.setItem("completed", "[]");

/**
 * load incomplete tasks
 */
var incomplete = localStorage.getItem("incomplete");
localStorage.setItem("incomplete", restoreTask());

function restoreTask() {
    if (incomplete === null || incomplete == "[]") {
        return "[]";
    } else {
        var task = JSON.parse(incomplete);
        for (var i = 0; i < task.length; i++) {
            var obj = task[i];

            const noTask = document.getElementById("no-task");
            const tasks = document.getElementById("tasks");
            const newTask = document.getElementById("task-name").value;
            const newPomo = document.getElementById("pomo-num").value;

            noTask.style.display = "none";

            tasks.appendChild(
                new Task({
                taskName: obj.task,
                pomoNum: obj.pomo,
                })
            );
            document.getElementById("form").reset();
        }
        return "[]";
    }
}



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

/**
 * save incomplete tasks
 * @param {*} event 
 */
window.onbeforeunload = function(event) {
    var tasks = document.getElementById("tasks");
    var taskItem = tasks.children;
    for (var i = 1; i < taskItem.length; i++) {
        var shadow = taskItem[i].shadowRoot.childNodes;
        var form = shadow[1];
        var name = form.children[0].innerHTML;
        var pomo = form.children[2].value;
        console.log(pomo);

        var incomplete = JSON.parse(localStorage.getItem("incomplete"));
        var task = {
            "id" : i,
            "task" : name,
            "pomo" : pomo
        };
        incomplete.push(task);
        localStorage.setItem("incomplete", JSON.stringify(incomplete));
    }
}
