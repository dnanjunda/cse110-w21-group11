class Task extends HTMLElement {
  constructor(task) {
    super();

    const taskList = document.getElementById("task-list");
    const shadow = this.attachShadow({ mode: "open" });

    const deleteTask = document.createElement("button");
    deleteTask.setAttribute("id", "delete");
    deleteTask.textContent = "Delete";
    deleteTask.addEventListener("click", function (e) {
      e.target.getRootNode().host.remove();
      if (taskList.children.length == 2) {
        document.getElementById("no-task").style.display = "inline";
      }
    });

    const editTask = document.createElement("button");
    editTask.setAttribute("id", "edit");
    editTask.textContent = "Edit";
    editTask.addEventListener("click", function (e) {
      if (editTask.textContent === "Edit") {
        editTask.textContent = "Done";
        editTask.previousSibling.previousSibling.contentEditable = true;
        editTask.previousSibling.readOnly = false;
      } else {
        editTask.textContent = "Edit";
        editTask.previousSibling.previousSibling.contentEditable = false;
        editTask.previousSibling.readOnly = true;
      }
    });

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "nested-grid");
    // const wrapper1 = document.createElement("div");
    // const wrapper2 = document.createElement("div");
    // const wrapper3 = document.createElement("div");
    // const wrapper4 = document.createElement("div");

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

    // this.setAttribute("class","nested-grid");
    wrapper.appendChild(taskName);
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
      
      .nested-grid > div {
          font-size: 16px; 
      }

      button {
        border-radius: 10px;
        width: 70px;
        border: none;
        padding: 5px;
    
        background-color: rgb(102, 128, 146);
    }
      `;
    shadow.appendChild(style);

    shadow.appendChild(wrapper);
  }
  
}

customElements.define("task-item", Task);
