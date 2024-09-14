console.log("Welcome to Magic notes app. Write your notes here.");
showNotes();

let myBtn = document.getElementById('myBtn');
myBtn.addEventListener('click', function() {
    let textArea = document.getElementById('textarea');
    let notes = localStorage.getItem('notes');
    let notesObj = notes ? JSON.parse(notes) : [];

    notesObj.push(textArea.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    textArea.value = ""; // Clear textarea after adding note
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem('notes');
    let notesObj = notes ? JSON.parse(notes) : [];
    let html = "";

    notesObj.forEach(function(element, index) {
        html += `<div class="noteBox">
            <h3 class="noteHeading">Note ${index + 1}</h3>
            <p class="paraHeading">${element}</p>
            <button class="buttonHeading" id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
        </div>`;
    });

    document.getElementById('notes').innerHTML = notesObj.length ? html : 'Nothing to show, create a new note from "Add a note" section above.';
}

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    let notesObj = notes ? JSON.parse(notes) : [];
    
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

function showTasks() {
    let tasks = localStorage.getItem('tasks');
    let tasksObj = tasks ? JSON.parse(tasks) : [];
    let html = "";

    tasksObj.forEach(function(task, index) {
        html += `<li class="list-group-item">
            ${task}
            <button class="btn btn-danger btn-sm float-right" onclick="deleteTask(${index})">Delete</button>
        </li>`;
    });

    document.getElementById('ulTasks').innerHTML = tasksObj.length ? html : 'No tasks to show.';
}

document.getElementById('btnAdd').addEventListener('click', function() {
    let taskInput = document.getElementById('inpNewTask');
    let taskValue = taskInput.value.trim();

    if (taskValue === "") return; // Do nothing if input is empty

    let tasks = localStorage.getItem('tasks');
    let tasksObj = tasks ? JSON.parse(tasks) : [];

    tasksObj.push(taskValue);
    localStorage.setItem('tasks', JSON.stringify(tasksObj));

    taskInput.value = ""; // Clear the input field
    showTasks();
    toggleButtons();
});

document.getElementById('btnReset').addEventListener('click', function() {
    localStorage.removeItem('tasks');
    showTasks();
    toggleButtons();
});

document.getElementById('btnSort').addEventListener('click', function() {
    let tasks = localStorage.getItem('tasks');
    if (!tasks) return;

    let tasksObj = JSON.parse(tasks);
    tasksObj.sort();
    localStorage.setItem('tasks', JSON.stringify(tasksObj));

    showTasks();
    toggleButtons();
});

document.getElementById('btnCleanup').addEventListener('click', function() {
    let tasks = localStorage.getItem('tasks');
    if (!tasks) return;

    let tasksObj = JSON.parse(tasks);
    tasksObj = tasksObj.filter(task => !task.includes('[Completed]'));
    localStorage.setItem('tasks', JSON.stringify(tasksObj));

    showTasks();
    toggleButtons();
});

function deleteTask(index) {
    let tasks = localStorage.getItem('tasks');
    let tasksObj = tasks ? JSON.parse(tasks) : [];
    
    tasksObj.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasksObj));
    showTasks();
    toggleButtons();
}

function toggleButtons() {
    let taskInput = document.getElementById('inpNewTask').value.trim();
    let buttons = ['btnAdd', 'btnReset', 'btnSort', 'btnCleanup'];
    buttons.forEach(btnId => document.getElementById(btnId).disabled = !taskInput);
}

document.getElementById('inpNewTask').addEventListener('input', function() {
    toggleButtons();
});
