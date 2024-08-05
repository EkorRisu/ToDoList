let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let theme = JSON.parse(localStorage.getItem("theme")) || false;

/**
 * Save tasks to local storage
 */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Render tasks to the DOM
 */
function renderTasks() {
    const taskList = document.getElementById("task-list");
    const taskFilter = document.getElementById("filter").value;
    const sortOrder = document.getElementById("sort").value;
    taskList.innerHTML = "";

    let filteredTasks = tasks;
    if (taskFilter === "completed") {
        filteredTasks = tasks.filter((task) => task.completed);
    } else if (taskFilter === "incomplete") {
        filteredTasks = tasks.filter((task) => !task.completed);
    }

    if (sortOrder === "asc") {
        filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === "desc") {
        filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");

        const createdAt = new Date(task.createdAt).toLocaleString();
        const completedAt = task.completedAt ? new Date(task.completedAt).toLocaleString() : null;
        const dateDisplay = completedAt ? `Completed At: ${completedAt}` : `Created At: ${createdAt}`;
        const completedButton = task.completed ? "Undo" : "Complete";

        li.innerHTML = `
          <div>
            <span class="task-text ${task.completed ? "text-decoration-line-through" : ""}">${task.text}</span>
            <div class="task-actions">
              <button class="btn btn-success" onclick="completeTask(${index})">${completedButton}</button>
              <button class="btn btn-warning" onclick="editTask(${index})">Edit</button>
              <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
            </div>
          </div>
          <div class="task-date">${dateDisplay}</div>
        `;
        taskList.appendChild(li);
    });
}

/**
 * Add a new task
 */
function addTask(event) {
    event.preventDefault();
    const taskText = document.getElementById("new-task").value;
    const now = new Date();
    tasks.push({
        text: taskText,
        completed: false,
        createdAt: now,
        completedAt: null
    });
    saveTasks();
    renderTasks();
    document.getElementById("new-task").value = "";
}

/**
 * Complete a task
 */
function completeTask(index) {
    const now = new Date();
    tasks[index].completed = !tasks[index].completed;
    tasks[index].completedAt = tasks[index].completed ? now : null;
    saveTasks();
    renderTasks();
}

/**
 * Edit a task
 */
function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    const now = new Date();
    if (newText !== null) {
        tasks[index].text = newText;
        tasks[index].editedAt = now;
        saveTasks();
        completeTask(index);
        renderTasks();
    }
}

/**
 * Delete a task
 */
function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

/**
 * Delete all tasks
 */
function deleteAll() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        if (confirm("This action cannot be undone. Are you sure?")) {
            tasks = [];
            saveTasks();
            renderTasks();
        } else {
            alert("Good for you");
        }
    }
}

// Initial render
renderTasks();
