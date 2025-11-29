let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingIndex = null;

const toDoList = document.querySelector(".todo-list");
const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const addButton = document.querySelector(".add-button");
const taskModal = document.getElementById("task-modal");
const mainContent = document.querySelector(".main");
const closeModalButton = document.getElementById("close-modal");

function openModal() {
  taskModal.style.display = "block";
  mainContent.classList.add("blur");
}

function closeModal() {
  taskModal.style.display = "none";
  mainContent.classList.remove("blur");
}

addButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);

window.addEventListener("DOMContentLoaded", () => {
  tasks.forEach((taskName) => renderTasks(taskName));
});

function validateTaskName() {
  return taskNameInput.value.trim() !== "";
}

function renderTasks(taskName) {
  const taskItem = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = taskName;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("task-buttons");

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");

  editButton.addEventListener("click", () => {
    taskNameInput.value = taskItem.querySelector("span").textContent;

    editingIndex = tasks.indexOf(taskName);

    openModal();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", () => {
    taskItem.remove();
    const index = tasks.indexOf(taskName);
    if (index > -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });

  toDoList.appendChild(taskItem);

  taskItem.appendChild(taskText);
  taskItem.appendChild(buttonsDiv);

  buttonsDiv.appendChild(editButton);
  buttonsDiv.appendChild(deleteButton);
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = validateTaskName();

  if (!isValid) {
    alert("Please enter a task!");
    return;
  }

  const taskName = taskNameInput.value.trim();

  if (editingIndex !== null) {
    tasks[editingIndex] = taskName;
    toDoList.innerHTML = "";
    tasks.forEach((name) => renderTasks(name));
    editingIndex = null;
  } else {
    tasks.push(taskName);
    renderTasks(taskName);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskNameInput.value = "";
  closeModal();
});
