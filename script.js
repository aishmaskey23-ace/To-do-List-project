const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const themeSelect = document.getElementById("themeSelect");

/* -------- LOAD SAVED DATA -------- */
function loadTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem("tasks"));
        if (!Array.isArray(saved)) return [];
        // give every task a unique id (also upgrades tasks saved by the old version)
        return saved.map((t, i) => ({
            id: t.id || Date.now() + i,
            text: t.text,
            completed: !!t.completed
        }));
    } catch (e) {
        return [];
    }
}

let tasks = loadTasks();
let darkMode = localStorage.getItem("darkMode") === "true";
let selectedTheme = localStorage.getItem("theme") || "blue";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ---------- APPLY THEME ----------- */
document.body.classList.add(selectedTheme);
themeSelect.value = selectedTheme;   // dropdown now matches the saved theme

/* -------- DARK MODE -------- */
if (darkMode) document.body.classList.add("dark");

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
}

/* -------- CHANGE THEME -------- */
function changeTheme() {
    document.body.classList.remove("blue", "purple", "green", "orange", "pink");
    document.body.classList.add(themeSelect.value);
    selectedTheme = themeSelect.value;
    localStorage.setItem("theme", selectedTheme);
}

/* -------- DISPLAY TASKS -------- */
function displayTasks() {
    taskList.innerHTML = "";

    const searchText = searchInput.value.trim().toLowerCase();
    const filter = filterSelect.value;
    const isFiltering = searchText !== "" || filter !== "all";

    tasks.forEach(task => {
        // search and filter are both applied here, so they work together
        if (!task.text.toLowerCase().includes(searchText)) return;
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        const li = document.createElement("li");
        li.className = "task";
        li.dataset.id = task.id;
        li.draggable = !isFiltering;   // reorder only when the full list is visible
        if (task.completed) li.classList.add("completed");

        // left side: checkbox + text
        const left = document.createElement("div");
        left.style.display = "flex";
        left.style.alignItems = "center";

        const checkbox = document.createElement("div");
        checkbox.className = "checkbox" + (task.completed ? " checked" : "");

        const span = document.createElement("span");
        span.textContent = task.text;   // textContent = safe from script injection

        left.appendChild(checkbox);
        left.appendChild(span);

        // right side: buttons
        const buttons = document.createElement("div");
        buttons.className = "task-buttons";

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);

        li.appendChild(left);
        li.appendChild(buttons);

        /* drag events */
        li.addEventListener("dragstart", () => li.classList.add("dragging"));
        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
            saveOrder();
        });

        taskList.appendChild(li);
    });
}

/* -------- ADD TASK -------- */
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return alert("Enter a task!");

    tasks.push({ id: Date.now(), text: text, completed: false });
    taskInput.value = "";
    saveTasks();
    displayTasks();
}

addBtn.addEventListener("click", addTask);

// pressing Enter also adds the task
taskInput.addEventListener("keydown", e => {
    if (e.key === "Enter") addTask();
});

/* -------- BUTTON CLICKS (checkbox, edit, delete) -------- */
taskList.addEventListener("click", e => {
    const li = e.target.closest(".task");
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.classList.contains("checkbox")) toggleComplete(id);
    else if (e.target.classList.contains("edit-btn")) editTask(id);
    else if (e.target.classList.contains("delete-btn")) deleteTask(id);
});

/* -------- COMPLETE TASK -------- */
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    saveTasks();
    displayTasks();
}

/* -------- EDIT -------- */
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt("Edit task:", task.text);
    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        displayTasks();
    }
}

/* -------- DELETE -------- */
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    displayTasks();
}

/* -------- SEARCH & FILTER -------- */
// both just redraw the list, and displayTasks() applies both together
function searchTasks() {
    displayTasks();
}

function filterTasks() {
    displayTasks();
}

/* ---------- DRAG & DROP SORTING ---------- */
taskList.addEventListener("dragover", e => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    if (!dragging) return;
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

/* Save order after dragging (matched by id, so duplicate names are safe) */
function saveOrder() {
    const newTasks = [];
    document.querySelectorAll(".task").forEach(li => {
        const original = tasks.find(t => t.id === Number(li.dataset.id));
        if (original) newTasks.push(original);
    });
    tasks = newTasks;
    saveTasks();
}

/* initialize */
displayTasks();