function addTask() {
    const noTask = document.getElementById('no-task');
    const taskList = document.getElementById('task-list');
    const taskName = document.getElementById('task-name');
    const pomoNum = document.getElementById('pomo-num');

    noTask.style.display = 'none';

    var newTask = taskName.value;
    var newPomo = pomoNum.value;
    var task = {
        'taskName': newTask,
        'pomoNum': newPomo,
    }
    taskList.appendChild(new Task(task));
}

function clearList() {
    const taskList = document.getElementById('task-list');
    const noTask = document.getElementById('no-task');
    noTask.style.display = 'inline';
    while (taskList.childNodes.length >= 4) {
        taskList.removeChild(taskList.childNodes[4]);
    }
}