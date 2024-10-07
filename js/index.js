let timer;

const STATIC_MIN = 15;
const STATIC_SEC = 0;

let minutes = STATIC_MIN;
let seconds = STATIC_SEC;
let tasks = [];
let selectedTaskIndex = -1;

const taskList = document.getElementById('task-list');

document.getElementById('add-task-btn').addEventListener('click', addTask);

document.getElementById('start-btn').addEventListener('click', startTimer);

document.getElementById('stop-btn').addEventListener('click', stopTimer);

function addTask() {
  const taskInput = document.getElementById('new-task');

  const taskName = taskInput.value.trim();

  if (!taskName) return;

  tasks.push(taskName);

  taskInput.value = '';
  updateTaskList();
}

function updateTaskList() {
  taskList.innerHTML = '';
  tasks.map((value, index) => {
    createTaskHtml(value, index);
  });
}

function createTaskHtml(task, index) {
  const taskItem = document.createElement('div');
  const p = document.createElement('p');

  p.innerText = task;

  taskItem.appendChild(p);
  taskItem.classList.add('task-item');

  if (selectedTaskIndex === index) {
    taskItem.classList.add('selected-task');
  }

  taskItem.addEventListener('click', () => {
    selectTask(index);
  });

  const button = document.createElement('button');

  button.textContent = 'Delete';

  button.classList.add('delete-btn');

  button.onclick = () => deleteTask(index);

  taskItem.appendChild(button);
  taskList.appendChild(taskItem);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskList();

  if (tasks.length == 0) {
  }
}

function selectTask(index) {
  if (selectedTaskIndex !== index) {
    selectedTaskIndex = index;
    updateTaskList();
  }
}

function updateSelectedTaskName(value) {
  document.getElementById('selected-task-name').textContent = value;
}

function startTimer() {
  if (selectedTaskIndex < 0) {
    return updateSelectedTaskName('No Task selected');
  }

  timer = setInterval(() => {
    if (minutes === 0 && seconds === 0) {
      clearInterval(timer);
      const message = 'Pomodoro session completed ! Take a Break';
      alert(message);

      minutes = STATIC_MIN;
      seconds = STATIC_SEC;
    } else if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateTimer();
  }, 1000);
}

function updateTimer() {
  const timerElement = document.getElementById('timer');

  timerElement.textContent = `
    ${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  const selectedTaskName = tasks[selectedTaskName]
    ? `selected: ${tasks[selectedTaskIndex]}`
    : 'No Task Selected';

  updateSelectedTaskName(selectedTaskName);
}

function stopTimer() {
  clearInterval(timer);
  minutes = STATIC_MIN;
  seconds = STATIC_SEC;
  updateTimer();
}
