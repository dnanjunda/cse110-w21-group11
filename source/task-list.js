
class Task extends HTMLElement {
    constructor(task) {
      super();

      const shadow = this.attachShadow({mode: 'open'});
  
      const wrapper = document.createElement('li');
      wrapper.setAttribute('class','task');
      const taskName = document.createElement('p');
      taskName.setAttribute('id', 'taskName');
      taskName.textContent = task['taskName'];
      const pomoNum = document.createElement('p');
      pomoNum.setAttribute('id','pomo-num');
      pomoNum.textContent = task['pomoNum'];

      wrapper.appendChild(taskName);
      wrapper.appendChild(pomoNum);

      const style = document.createElement('style');
      style.textContent = `li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 200px;
      }
      `
      shadow.appendChild(style);
  
      shadow.appendChild(wrapper);
    }
  }
  
  customElements.define('task-item', Task);
  