// select needed elements

let input = document.getElementById("taskInput");

let addBtn = document.getElementById("addBtn");

let taskList = document.getElementById("taskList");

// declare tasksarray and add tasks to page
let tasksArray = JSON.parse(window.localStorage.getItem("tasks")) || [];

if (window.localStorage.getItem("tasks")) {
  addTasksToPageFromLocal(tasksArray);
}

// check if input value isnt empty & when user click add empty the input
addBtn.onclick = function () {
  if (input.value !== "") {
    addTasksToArray(input.value);
    input.value = "";
  }
};

document.addEventListener("click", function(e) {
  if (e.target.className === "delete-btn") {
    e.target.parentElement.remove()
    deleteTask(e.target.parentElement.getAttribute("data-id"))
  }
})

function addTasksToArray(taskText) {
  // get task data
  const task = {
    id: Date.now(),
    taskContent: taskText,
  };
  // add task to the array
  tasksArray.push(task);
  addTasksToThePage(tasksArray);
  addTasksToLocalStorage(tasksArray);
}

function addTasksToThePage(tasksArray) {
  // clear tasks first
  taskList.innerHTML = "";
  tasksArray.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = task.taskContent;
    li.setAttribute("data-id", task.id)
    let span = document.createElement("span");
    span.className = "delete-btn"
    span.innerHTML = "Delete";
    li.appendChild(span);
    taskList.appendChild(li);
  });
}

function addTasksToLocalStorage(tasksArray) {
  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function addTasksToPageFromLocal(tasksArray) {
  addTasksToThePage(tasksArray);
}

function deleteTask(taskId) {
  tasksArray = tasksArray.filter((task) => task.id != taskId)
  console.log(taskId)
  addTasksToLocalStorage(tasksArray)
}