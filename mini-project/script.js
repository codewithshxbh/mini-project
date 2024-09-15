document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript loaded. Welcome to Magic notes app.");
    showNotes();
    showTasks();

    // Adding a new note
    document.getElementById('myBtn').addEventListener('click', function() {
        let textArea = document.getElementById('textarea');
        let notes = localStorage.getItem('notes');
        let notesObj = notes ? JSON.parse(notes) : [];

        if (textArea.value.trim() === "") {
            console.log("Note is empty, not adding.");
            return;
        }

        notesObj.push(textArea.value.trim());
        localStorage.setItem("notes", JSON.stringify(notesObj));

        textArea.value = "";
        showNotes();
    });

    // Display notes
    function showNotes() {
        let notes = localStorage.getItem('notes');
        let notesObj = notes ? JSON.parse(notes) : [];
        let html = "";

        notesObj.forEach(function(element, index) {
            html += `<div class="noteBox">
                <h3 class="noteHeading">Note ${index + 1}</h3>
                <hr>
                <p class="paraHeading">${element}</p>
                <button class="buttonHeading" id="${index}" onclick="deleteNote(${index})">Delete Note</button>
                <hr>
            </div>`;
        });

        let notesElem = document.getElementById('notes');
        if (notesObj.length !== 0) {
            notesElem.innerHTML = html;
        } else {
            notesElem.innerHTML = `Nothing to show, create a new note from "Add a note" section above.`;
        }
    }

    // Delete a note
    window.deleteNote = function(index) {
        let notes = localStorage.getItem('notes');
        let notesObj = notes ? JSON.parse(notes) : [];
        notesObj.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        showNotes();
        console.log(`Note ${index + 1} deleted.`);
    };

    // Task-related functions
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
        console.log("Tasks displayed.");
    }

    document.getElementById('btnAdd').addEventListener('click', function() {
        let taskInput = document.getElementById('inpNewTask');
        let taskValue = taskInput.value.trim();

        if (taskValue === "") return;

        let tasks = localStorage.getItem('tasks');
        let tasksObj = tasks ? JSON.parse(tasks) : [];

        tasksObj.push(taskValue);
        localStorage.setItem('tasks', JSON.stringify(tasksObj));

        taskInput.value = "";
        showTasks();
        toggleButtons();
        console.log("Task added.");
    });

    document.getElementById('btnReset').addEventListener('click', function() {
        localStorage.removeItem('tasks');
        showTasks();
        toggleButtons();
        console.log("Tasks reset.");
    });

    document.getElementById('btnSort').addEventListener('click', function() {
        let tasks = localStorage.getItem('tasks');
        if (!tasks) return;

        let tasksObj = JSON.parse(tasks);
        tasksObj.sort();
        localStorage.setItem('tasks', JSON.stringify(tasksObj));

        showTasks();
        toggleButtons();
        console.log("Tasks sorted.");
    });

    document.getElementById('btnCleanup').addEventListener('click', function() {
        let tasks = localStorage.getItem('tasks');
        if (!tasks) return;

        let tasksObj = JSON.parse(tasks);
        tasksObj = tasksObj.filter(task => !task.includes('[Completed]'));
        localStorage.setItem('tasks', JSON.stringify(tasksObj));

        showTasks();
        toggleButtons();
        console.log("Tasks cleaned up.");
    });

    window.deleteTask = function(index) {
        let tasks = localStorage.getItem('tasks');
        let tasksObj = tasks ? JSON.parse(tasks) : [];
        
        tasksObj.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasksObj));
        showTasks();
        toggleButtons();
        console.log(`Task ${index + 1} deleted.`);
    };

    function toggleButtons() {
        let taskInput = document.getElementById('inpNewTask').value.trim();
        let buttons = ['btnAdd', 'btnReset', 'btnSort', 'btnCleanup'];
        buttons.forEach(btnId => document.getElementById(btnId).disabled = !taskInput);
    }

    document.getElementById('inpNewTask').addEventListener('input', function() {
        toggleButtons();
    });

    const apiKey = '868b78507ac5cd905559fbe39de81e97'; 
    const city = 'Delhi'; 

    function displayWeather(cityName, temperature, description) {
        let weatherContainer = document.getElementById('weather-container');
        
        weatherContainer.innerHTML = `
            <h3>${cityName}</h3>
            <p>${Math.round(temperature)}°C</p>
            <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        `;

        
        const weatherSection = document.getElementById('weather-section');
        const weatherConditions = {
            'clear': 'https://img.freepik.com/free-photo/blue-sky-background-with-clouds_1017-21758.jpg?t=st=1726402664~exp=1726406264~hmac=93a9739ed26f01212108000a882ae3c11dc070c6cd58152afa64a1b714b81d37&w=1060',  
            'clouds': 'https://img.freepik.com/free-photo/beautiful-natural-clouds-sky-daylight_23-2148825004.jpg?t=st=1726402324~exp=1726405924~hmac=95d8a6d514043e350845168d32477b74fafc58ee0a617df1bfb3a8c6ceea1a48&w=1380', 
            'rain': 'https://img.freepik.com/free-photo/closeup-shot-window-rainy-gloomy-day-raindrops-rolling-down-window_181624-26516.jpg?t=st=1726402806~exp=1726406406~hmac=f2f8d99570c5b3535ee5795f670065bf6951857aa55932547d1d767a9434eb99&w=1060',   
            'drizzle': 'https://cdn.windy.app/site-storage/posts/October2023/nature-grass-snow-fog-mist-morning-41797-pxhere.com.jpg', 
            'snow': 'https://fournews-assets-prod-s3-ew1-nmprod.s3.amazonaws.com/media/2017/12/snow_london_g_hd.jpg',   
            'thunderstorm': 'https://img.freepik.com/free-photo/digital-art-style-illustration-thunderstorm_23-2151812886.jpg?t=st=1726402952~exp=1726406552~hmac=ce001842885662391cabeb43a2d182459886c9c43c02f9c96815a845b4d2a03a&w=1380', 
            'haze': 'https://img.freepik.com/free-photo/beautiful-sky-with-clouds_58702-1455.jpg?w=1060&t=st=1726402698~exp=1726403298~hmac=1e22f43997c6c8b9a1d90cf8920e00e263f8f857bf8c7dfb9326ae668e3e009c'    
        };

        let condition = description.split(' ')[0].toLowerCase();
        weatherSection.style.backgroundImage = `url(${weatherConditions[condition] || 'https://example.com/default.jpg'})`;
        weatherSection.style.backgroundSize = 'cover';
        weatherSection.style.backgroundPosition = 'center';
    }

    function showError(message) {
        document.getElementById('weather-container').innerHTML = `
            <p>Error: ${message}</p>
        `;
    }

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => {
            const data = response.data;
            const temperature = data.main.temp - 273.15;
            const description = data.weather[0].description;
            displayWeather(data.name, temperature, description);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            showError('Unable to fetch weather data.');
        });
});
