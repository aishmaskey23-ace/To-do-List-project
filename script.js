const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const themeSelect = document.getElementById("themeSelect");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = localStorage.getItem("darkMode") === "true";
let selectedTheme = localStorage.getItem("theme") || "blue";

/* ---------- APPLY THEME ----------- */
document.body.classList.add(selectedTheme);

/* -------- DARK MODE -------- */
if (darkMode) document.body.classList.add("dark");

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
}

/* -------- CHANGE THEME -------- */
function changeTheme() {
    document.body.classList.remove("blue","purple","green","orange","pink");
    document.body.classList.add(themeSelect.value);
    selectedTheme = themeSelect.value;
    localStorage.setItem("theme", selectedTheme);
}

/* -------- DISPLAY TASKS -------- */
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        
        const li = document.createElement("li");
        li.className = "task";
        li.draggable = true;

        li.innerHTML = `
            <div style="display:flex; align-items:center;">
                <div class="checkbox ${task.completed ? "checked" : ""}" onclick="toggleComplete(${index})"></div>
                <span>${task.text}</span>
            </div>
            <div class="task-buttons">
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        if (task.completed) li.classList.add("completed");

        /* drag events */
        li.addEventListener("dragstart", () => li.classList.add("dragging"));
        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
            saveOrder();
        });

        taskList.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* -------- ADD TASK -------- */
addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return alert("Enter a task!");

    tasks.push({ text: taskInput.value, completed: false });
    taskInput.value = "";
    displayTasks();
});

/* -------- COMPLETE TASK -------- */
function toggleComplete(i) {
    tasks[i].completed = !tasks[i].completed;
    displayTasks();
}

/* -------- EDIT -------- */
function editTask(i) {
    let newText = prompt("Edit task:", tasks[i].text);
    if (newText) {
        tasks[i].text = newText;
        displayTasks();
    }
}

/* -------- DELETE -------- */
function deleteTask(i) {
    tasks.splice(i, 1);
    displayTasks();
}

/* -------- SEARCH -------- */
function searchTasks() {
    const text = searchInput.value.toLowerCase();

    document.querySelectorAll(".task").forEach(task => {
        const t = task.innerText.toLowerCase();
        task.style.display = t.includes(text) ? "flex" : "none";
    });
}

/* -------- FILTER -------- */
function filterTasks() {
    const filter = filterSelect.value;

    document.querySelectorAll(".task").forEach((task, i) => {
        if (filter === "completed" && !tasks[i].completed)
            task.style.display = "none";
        else if (filter === "pending" && tasks[i].completed)
            task.style.display = "none";
        else
            task.style.display = "flex";
    });
}

/* ---------- DRAG & DROP SORTING ---------- */
taskList.addEventListener("dragover", e => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(taskList, e.clientY);
    if (afterElement == null) taskList.appendChild(dragging);
    else taskList.insertBefore(dragging, afterElement);
});

function getDragAfterElement(list, y) {
    const items = [...list.querySelectorAll(".task:not(.dragging)")];

    return items.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset)
            return { offset: offset, element: child };
        else
            return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

/* Save order after dragging */
function saveOrder() {
    const newTasks = [];
    document.querySelectorAll(".task span").forEach(span => {
        const text = span.innerText;
        const original = tasks.find(t => t.text === text);
        newTasks.push(original);
    });
    tasks = newTasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* initialize */
displayTasks();
