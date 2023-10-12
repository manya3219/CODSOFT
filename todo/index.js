const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateTaskList() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
                    <span>${task}</span>
                    <div class="task-actions">
                        <button class="edit-button" data-index="${index}">Edit</button>
                        <button class="delete-button" data-index="${index}">Delete</button>
                    </div>
                `;
    taskList.appendChild(listItem);
  });
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTask);
  });
  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", handleEdit);
  });

  taskList.addEventListener("click", toggleFullText);
}

function handleTaskItemClick(event) {
  const listItem = event.target.closest("li");
  if (listItem) {
    listItem.classList.toggle("active");
  }
}

function handleEdit(event) {
  const index = event.target.getAttribute("data-index");
  const listItem = event.target.closest("li");
  const taskTextElement = listItem.querySelector("span");
  const editedTask = prompt("Edit task:", taskTextElement.textContent);
  if (editedTask !== null) {
    taskTextElement.textContent = editedTask;
    tasks[index] = editedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function deleteTask(event) {
  const index = event.target.getAttribute("data-index");
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskList();
}
function toggleFullText(event) {
  const listItem = event.target.closest("li");
  if (listItem) {
    const taskTextElement = listItem.querySelector("span");
    if (taskTextElement.classList.contains("truncate-text")) {
      taskTextElement.classList.remove("truncate-text");
    } else {
      taskTextElement.classList.add("truncate-text");
    }
  }
}

taskList.addEventListener("click", toggleFullText);

taskList.addEventListener("click", handleTaskItemClick);

const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach((button) => {
  button.addEventListener("click", editTask);
});

const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteTask);
});

addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    updateTaskList();
  }
}

updateTaskList();
