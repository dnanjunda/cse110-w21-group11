class Task extends window.HTMLElement {
  constructor(task) {
    super();

    const tasks = document.getElementById("tasks");
    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("form");
    wrapper.setAttribute("class", "nested-grid");

    const taskName = document.createElement("p");
    taskName.setAttribute("id", "taskName");
    taskName.textContent = task.taskName;
    const editName = document.createElement("input");
    editName.setAttribute("id","edit-name")
    editName.value = taskName.textContent;
    editName.setAttribute("required","");
    editName.style.display = "none";

    const pomoNum = document.createElement("input");
    pomoNum.setAttribute("type", "number");
    pomoNum.setAttribute("id", "pomo-num");
    pomoNum.setAttribute("type", "number");
    pomoNum.setAttribute("min", "1");
    pomoNum.setAttribute("max", "4");
    pomoNum.setAttribute("readonly", "true");
    pomoNum.value = task.pomoNum;

    const deleteTask = document.createElement("button");
    deleteTask.setAttribute("id", "delete");
    deleteTask.textContent = "Delete";
    deleteTask.addEventListener("click", function (e) {
      e.target.getRootNode().host.remove();
      if (tasks.children.length === 1 && 
        document.getElementById("no-task").style.display === "none") {
        document.getElementById("no-task").style.display = "inline";
      }
    });

    const editTask = document.createElement("button");
    editTask.setAttribute("id", "edit");
    editTask.textContent = "Edit";
    wrapper.addEventListener("submit", function(e) {
      e.preventDefault();
      if (editTask.textContent === "Edit") {
        editTask.textContent = "Done";
        taskName.style.display = "none";
        editName.style.display = "inline-block";
        pomoNum.readOnly = false;
      } else {
        editTask.textContent = "Edit";
        taskName.style.display = "block";
        editName.style.display = "none";
        taskName.textContent = editName.value;
        pomoNum.readOnly = true;
      }
    });

    // this.setAttribute("class","nested-grid");
    wrapper.appendChild(taskName);
    wrapper.appendChild(editName);
    wrapper.appendChild(pomoNum);
    wrapper.appendChild(editTask);
    wrapper.appendChild(deleteTask);

    // wrapper.appendChild(wrapper1);
    // wrapper.appendChild(wrapper2);
    // wrapper.appendChild(wrapper3);
    // wrapper.appendChild(wrapper4);
    




    const style = document.createElement("style");
    style.textContent = `.nested-grid {
          display: grid;
          grid-template-columns: 45% 25% 15% 15%;
          padding: 10px;
          max-width: 100%;
          min-width: 400px;  
      }

      button {
        border-radius: 10px;
        width: 70px;
        border: none;
        padding: 5px;
    
        background-color: rgb(102, 128, 146);
      }

      #edit-name {
        text-align: center;
        font-size: 16px;
        padding: 12px;
      }
      `;
    shadow.appendChild(style);

    shadow.appendChild(wrapper);
  }
  
}

window.customElements.define("task-item", Task);
