const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value;
  if (taskText.trim() === "") {
    alert("Please enter a task.");
    return;
  }
  createTask(taskText);
  taskInput.value = "";
  saveData();
});

// Hàm tạo task mới và gán sự kiện
function createTask(taskText) {
  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;

  const span = document.createElement("span");
  span.innerHTML = "\u00d7";
  taskItem.appendChild(span);
  taskList.appendChild(taskItem);

  // Toggle class khi click vào task
  taskItem.addEventListener("click", () => {
    taskItem.classList.toggle("checked");
    saveData();
  });

  // Xoá task khi click vào dấu x
  span.addEventListener("click", (event) => {
    event.stopPropagation();
    taskItem.remove();
    saveData();
  });
}

// Lưu dữ liệu vào localStorage
function saveData() {
  localStorage.setItem("data", taskList.innerHTML);
}

// Load dữ liệu từ localStorage và gán lại sự kiện
function showTasks() {
  taskList.innerHTML = localStorage.getItem("data");

  // Gán lại sự kiện cho từng task và span sau khi reload
  const allTasks = taskList.querySelectorAll("li");
  allTasks.forEach(taskItem => {
    const span = taskItem.querySelector("span");

    taskItem.addEventListener("click", () => {
      taskItem.classList.toggle("checked");
      saveData();
    });

    span.addEventListener("click", (event) => {
      event.stopPropagation();
      taskItem.remove();
      saveData();
    });
  });
}

showTasks();
