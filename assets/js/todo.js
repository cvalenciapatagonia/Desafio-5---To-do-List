//¿ Definición de variables

let tasks = [
  { id: 1, name: "Learn HTML & CSS", completed: false },
  { id: 2, name: "Learn Javascript", completed: false },
  { id: 3, name: "Keep Learning Javascript", completed: false },
];
let taskId = tasks.length;

//¿ Referencia de elementos del DOM

const taskInput = document.getElementById("taskInput");
const taskTable = document.getElementById("taskTable");
const totalCounter = document.getElementById("totalCounter");
const completedCounter = document.getElementById("completedCounter");

//¿ Funciones para manipular las tareas

function addTask() {
  const taskName = taskInput.value.trim();
  if (taskName !== "") {
    taskId++;
    const newTask = { id: taskId, name: taskName, completed: false };
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  updateTaskIds();
  renderTasks();
}

function toggleCompleted(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  renderTasks();
}

function updateTaskIds() {
  tasks.forEach((task, index) => {
    task.id = index + 1;
  });
  taskId = tasks.length > 0 ? tasks.length : 0;
}

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    addTask();
  }
}

//¿ Asignacion de  eventos a elementos del DOM

taskInput.addEventListener("keydown", handleKeyPress);

//¿ Función para renderizar las tareas

function renderTasks() {
  taskTable.innerHTML = "";

  tasks.forEach((task) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = task.id;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = task.name;
    row.appendChild(nameCell);

    const actionsCell = document.createElement("td");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleCompleted(task.id));
    actionsCell.appendChild(checkbox);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "❌";
    deleteButton.addEventListener("click", () => deleteTask(task.id));
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    taskTable.appendChild(row);
  });

  totalCounter.textContent = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed);
  completedCounter.textContent = completedTasks.length;
}

//¿ Actualizacion de IDs de  tareas iniciales

updateTaskIds();

//¿ Renderizacion de tareas iniciales

renderTasks();
