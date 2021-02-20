class Task extends HTMLElement {
  constructor(task) {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const deleteTask = document.createElement("button");
    deleteTask.setAttribute("id", "delete");
    deleteTask.textContent = "Delete";
    deleteTask.addEventListener("click", function (e) {
      e.target.parentElement.remove();
    });

    const editTask = document.createElement("button");
    editTask.setAttribute("id", "edit");
    editTask.textContent = "Edit";
    editTask.addEventListener("click", function (e) {
      if (editTask.textContent === "Edit") {
        editTask.textContent = "Done";
        editTask.nextSibling.contentEditable = true;
        editTask.nextSibling.nextSibling.readOnly = false;
      } else {
        editTask.textContent = "Edit";
        editTask.nextSibling.contentEditable = false;
        editTask.nextSibling.nextSibling.readOnly = true;
      }
    });

    const wrapper = document.createElement("li");
    wrapper.setAttribute("class", "task");
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

    wrapper.appendChild(deleteTask);
    wrapper.appendChild(editTask);
    wrapper.appendChild(taskName);
    wrapper.appendChild(pomoNum);

    const style = document.createElement("style");
    style.textContent = `li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 200px;
      }
      `;
    shadow.appendChild(style);

    shadow.appendChild(wrapper);
  }
}

customElements.define("task-item", Task);
