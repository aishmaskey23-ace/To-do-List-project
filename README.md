Ultimate To-Do List Project

A dynamic task management web application built with HTML, CSS and JavaScript. Tasks are saved in the browser using Local Storage, so your data is still there after you refresh or close the page.

![demo gif](<Todo demo.gif>)
## GitHub Repository Link: https://github.com/aishmaskey23-ace/To-do-List-project
## Live Demo Link: to-do-list-project-lilac.vercel.app

This is a practice project that covers task creation, deletion, completion tracking and persistent storage, along with some extra features like search, filter, themes and drag-and-drop.

## Features

Core Features
1. Add tasks: type a task and click Add. Empty tasks are rejected with an alert.
2. Delete tasks: remove any task with the Delete button.
3. Task status tracking: click the checkbox to mark a task as completed or pending. Completed tasks are shown with a strikethrough.
4. Local Storage: tasks, selected theme and dark mode setting are saved automatically.

## Extra Features
a. Edit tasks using the Edit button.
b. Search tasks by text.
c. Filter tasks by All, Completed or Pending.
d. Drag and drop to reorder tasks (desktop browsers).
e. Dark mode toggle (🌙).
f. 5 color themes: Blue, Purple, Green, Orange and Pink.
g. Responsive layout that adapts to smaller screens.

## Technologies Used
Technology	        Purpose
HTML5	            Structure of the page
CSS3	            Styling, themes (CSS variables), dark mode, responsive layout
JavaScript (ES6+) 	DOM manipulation, task logic, drag and drop
Local Storage API	Saving data in the browser

## Project Structure
To-do List project/
├── index.html    # Page layout
├── style.css     # Styling, themes and dark mode
├── script.js     # Application logic
└── README.md     # Project documentation 

## How to Run
Download or clone this repository.
Open the project folder.
Double-click index.html to open it in any modern browser (Chrome, Edge, Firefox, Safari).

No installation, build step or server is required.

## How to Use
Add a task: type in the input box and click Add.
Complete a task: click the checkbox next to the task.
Edit a task: click Edit, change the text in the prompt and confirm.
Delete a task: click Delete.
Search: type in the search box to show only matching tasks.
Filter: choose All, Completed or Pending from the dropdown.
Reorder: drag a task and drop it in a new position.
Change look: pick a color from the theme dropdown or click 🌙 for dark mode.

## How It Works
Tasks are stored as an array of objects in the form { text: "Buy milk", completed: false }.
Every change (add, edit, delete, complete, reorder) updates the array and saves it to Local Storage under the key tasks.
On page load, the array is read back from Local Storage and rendered by displayTasks().
The selected theme and dark mode setting are stored under the keys theme and darkMode.
Themes work through a CSS variable (--theme) that changes depending on the class on <body>.

## Testing
The application was tested manually using the following test cases:

#	Test Case	Steps	Expected Result
1	Add a task	Type "Buy milk" and click Add	Task appears in the list and the input clears
2	Add an empty task	Click Add with an empty input	Alert "Enter a task!" is shown and nothing is added
3	Delete a task	Click Delete on a task	Task is removed from the list
4	Complete a task	Click the checkbox	Checkbox is ticked and text gets a strikethrough
5	Un-complete a task	Click a ticked checkbox	Task returns to pending style
6	Edit a task	Click Edit and enter new text	Task text is updated
7	Persistence	Add tasks, then refresh the page	All tasks and their status are still there
8	Filter: Completed	Select "Completed"	Only completed tasks are visible
9	Filter: Pending	Select "Pending"	Only pending tasks are visible
10	Search	Type part of a task name	Only matching tasks are visible
11	Theme change	Select a different theme, then refresh	Chosen theme is kept after refresh
12	Dark mode	Click 🌙, then refresh	Dark mode is kept after refresh
13	Drag and drop	Drag a task to a new position	Order changes and is kept after refresh

## Future Improvements
Add tasks by pressing the Enter key
Replace the prompt() edit dialog with inline editing
Give each task a unique ID so duplicate task names are handled safely
Make search and filter work together and stay active after changes
Sanitize task text before rendering it
Touch support for drag and drop on mobile devices
Due dates, priorities and categories
Better dark mode styling for inputs and dropdowns
Keyboard-accessible checkboxes

## Author
Aish Maskey
This is a practice project made while learning HTML, CSS and JavaScript.