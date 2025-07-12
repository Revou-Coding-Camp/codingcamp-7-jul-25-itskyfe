// Global List
let tasks = [];

// Function to add a task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const dueDateInput = document.getElementById("due-date-input");

  // Validate inputs
  if (taskInput.value === "" || dueDateInput.value === "") {
    alert("Please fill in both task and due date.");
  } else {
    const newTask = {
      id: Date.now(),
      task: taskInput.value,
      dueDate: dueDateInput.value,
      completed: false,
    };

    tasks.push(newTask);
    taskInput.value = "";
    dueDateInput.value = "";
    displayTasks();
  }
}

// Function to display all tasks
function displayTasks() {
  renderTasks(tasks);
}

// Function to render given task list
function renderTasks(taskArray) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  if (taskArray.length === 0) {
    taskList.innerHTML =
      "<p class='text-center text-gray-500'>Task is Empty!</p>";
    return;
  }

  taskArray.forEach((element) => {
    const taskItem = `
        <div class="flex lg:w-6xl sm:min-w-lg justify-between items-center mb-[10px] p-[8px] px-[30px] bg-white rounded-lg shadow-md hover:bg-[#395886] hover:text-white duration-500 ease-in-out">
            <div class="flex flex-col">
                <span class="text-lg ${element.completed}">${element.task}</span>
                <span class="text-sm">${element.dueDate}</span>
            </div>
            <div class="flex gap-[8px]">
                <button 
  class="completion-btn ${element.completed ? "active" : ""}" 
  onclick="toggleTaskCompletion(${element.id})"
>
  ${element.completed ? "Completed" : "Mark as done"}
</button>

                <button class="bg-gray-400 text-white p-[4px] w-[33px] rounded-full cursor-pointer" onclick="deleteTask(${
                  element.id
                })">X</button>
            </div>
        </div>
        `;
    taskList.innerHTML += taskItem;
  });
}

// Delete specific task
function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    displayTasks();
  }
}

// Delete all tasks
function deleteAllTasks() {
  tasks = [];
  displayTasks();
}

// Toggle completed state
function toggleTaskCompletion(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    displayTasks();
  }
}

// Filter function
function filterTasks(filterType = "all", clickedBtn = null) {
  let filteredTasks = [];

  // Update tombol filter aktif
  const allButtons = document.querySelectorAll(".filter-btn");
  allButtons.forEach((btn) => btn.classList.remove("active"));
  if (clickedBtn) clickedBtn.classList.add("active");

  // Filter logika
  if (filterType === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filterType === "uncompleted") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else {
    filteredTasks = tasks;
  }

  renderTasks(filteredTasks);
}
