class Task extends HTMLElement {
  constructor(task) {
    super();

    const taskList = document.getElementById("tasks");
    const shadow = this.attachShadow({ mode: "open" });

    const deleteTask = document.createElement("button");
    deleteTask.setAttribute("id", "delete");
    deleteTask.textContent = "Delete";
    deleteTask.addEventListener("click", function (e) {
      e.target.getRootNode().host.remove();
      if (taskList.children.length == 1) {
        document.getElementById("no-task").style.display = "block";
      }
    });

    const editTask = document.createElement("button");
    editTask.setAttribute("id", "edit");
    editTask.textContent = "Edit";
    editTask.addEventListener("click", function (e) {
      if (editTask.textContent === "Edit") {
        editTask.textContent = "Done";
        editTask.previousSibling.previousSibling.contentEditable = true;
        editTask.previousSibling.previousSibling.style.backgroundColor = "#dddbdb";
        editTask.previousSibling.readOnly = false;
        editTask.previousSibling.style.backgroundColor = "#dddbdb";
      } else {
        editTask.textContent = "Edit";
        editTask.previousSibling.previousSibling.contentEditable = false;
        editTask.previousSibling.previousSibling.style.backgroundColor = "white";
        editTask.previousSibling.readOnly = true;
        editTask.previousSibling.style.backgroundColor = "white";
      }
    });

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "nested-grid");

    const taskName = document.createElement("p");
    taskName.setAttribute("id", "taskName");
    taskName.textContent = task["taskName"];
    const pomoNum = document.createElement("input");

    pomoNum.setAttribute("type", "number");
    pomoNum.setAttribute("id", "pomo-num");
    pomoNum.setAttribute("type", "number");
    pomoNum.setAttribute("min", "1");
    pomoNum.setAttribute("max", "4");
    pomoNum.setAttribute("readonly", "true");
    pomoNum.value = task["pomoNum"];

    wrapper.appendChild(taskName);
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

      input {
        border: none;
        text-align: center;
        padding-right: 5vw;
        margin-left: 5vw;
      }

      input:focus {
        outline: none;
      }

      #taskName {
        text-align: left;
        padding-left: 2vw;
      }

      #taskName:focus {
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
      }`;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
  
}

customElements.define("task-item", Task);
