document.body.innerHTML =
  '<span id="minute">25</span>' +
  '<span id="seconds">00</span>' +
  '<p id="completePomos"> Number of Complete Pomodors </p>' +
  '<input type="button" id="mixBut" style="background-color:lightgreen;color:white;width:150px;height:40px;" value="Start Timer" />' +
  '<button id="reset-btn" style="background-color:gray;color:white;width:150px;height:40px;">Reset</button>' +
  '<div id="settings-modal" class="modal"></div>' +
  '<input type="number" placeholder="Minutes" class="minutes" id="userMins" value="25"/>' +
  '<input type="number" placeholder="Seconds" class="seconds" min="0" step="1" id="userSecs" value="0"/>' +
  '<input id="volume-number" name="volume-number" type="number" min="0" max="100" value="100">' +
  '<input id="volume-slider" name="volume-slider" type="range" min="0" max="100" value="100">' +
  '<input type="number" placeholder="Breaks" class="pomos" id="shortBreakPomos" value="5"/>' +
  '<input type="number" placeholder="Pomos" class="pomos" id="userPomos" value="4"/>' +
  '<input type="number" placeholder="Breaks" class="pomos" id="breakPomos" value="30"/>' +
  '<select id="changeSelect" name="alarmMusic" onselect="sound()"></select>' +
  '<p id="current-task">Current Task: Dummy</p>' +
  '<section id="select-task"></section>';
