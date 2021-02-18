function addTask() {
    const noTask = document.getElementById('no-task');
    const taskList = document.getElementById('task-list');
    const taskName = document.getElementById('task-name');
    const pomoNum = document.getElementById('pomo-num');

    noTask.style.display = 'hidden';

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
    while (taskList.childElementCount > 1) {
        taskList.removeChild(taskList.childNodes[3]);
    }
    const noTask = document.getElementById('no-task');
    noTask.style.display = 'inline';
}