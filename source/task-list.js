class Task extends window.HTMLElement {
  constructor(task) {
    super();

    const tasks = document.getElementById("tasks");
    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("form");
    wrapper.setAttribute("class", "nested-grid");

    const taskName = document.createElement("p");
    taskName.setAttribute("id", "task-name");
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
        document.getElementById("no-task").style.display = "block";
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
        editName.style.display = "block";
        editName.style.backgroundColor = "#dddbdb";
        pomoNum.readOnly = false;
        pomoNum.style.backgroundColor = "#dddbdb";
      } else {
        editTask.textContent = "Edit";
        taskName.style.display = "block";
        editName.style.display = "none";
        editName.style.backgroundColor = "white";
        taskName.textContent = editName.value;
        pomoNum.readOnly = true;
        pomoNum.style.backgroundColor = "white";
      }
    });

    // this.setAttribute("class","nested-grid");
    wrapper.appendChild(taskName);
    wrapper.appendChild(editName);
    wrapper.appendChild(pomoNum);
    wrapper.appendChild(editTask);
    wrapper.appendChild(deleteTask);
    

    const style = document.createElement("style");
    style.textContent = 
    `.nested-grid {
          display: grid;
          grid-template-columns: auto auto auto auto;
          padding-bottom: 5px;
          padding-left: 0px;
          margin: auto;
          align-content: center;
      }

      #task-name {
        text-align: left;
      }

      #task-name:focus {
        outline: none;
      }

      #pomo-num {
        text-align: left;
        width: 40px;
      }

      #edit {
        font-family: Nunito;
        width: 70px;
        border: none;
        border-radius: 10px;
        background-color: rgb(102, 128, 146);
      }

      #edit-name {
        text-align: left;
        padding-left: 2vw;
        font-size: 16px;
        padding: 12px;
      }
      
        text-align: center;
        color: white;
      }

      #edit:focus {
        outline: none;
      }

      #delete {
        font-family: Nunito;
        width: 70px;
        color: white;
        border: none;
        border-radius: 10px;
        margin-left: 0px;
        background-color: #bd0000;
      }
      #delete:focus {
        outline: none;
      }
      `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
  
}

window.customElements.define("task-item", Task);
