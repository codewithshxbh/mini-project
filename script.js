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
     // Adding a new task
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
        console.log("Task added.");
    });

    // Reset tasks
    document.getElementById('btnReset').addEventListener('click', function() {
        localStorage.removeItem('tasks');
        showTasks();
        console.log("Tasks reset.");
    });

    // Sort tasks
    document.getElementById('btnSort').addEventListener('click', function() {
        let tasks = localStorage.getItem('tasks');
        if (!tasks) return;

        let tasksObj = JSON.parse(tasks);
        tasksObj.sort();
        localStorage.setItem('tasks', JSON.stringify(tasksObj));

        showTasks();
        console.log("Tasks sorted.");
    });

    // Cleanup tasks
    document.getElementById('btnCleanup').addEventListener('click', function() {
        let tasks = localStorage.getItem('tasks');
        if (!tasks) return;

        let tasksObj = JSON.parse(tasks);
        tasksObj = tasksObj.filter(task => !task.includes('[Completed]'));
        localStorage.setItem('tasks', JSON.stringify(tasksObj));

        showTasks();
        console.log("Tasks cleaned up.");
    });

    // Delete a task
    window.deleteTask = function(index) {
        let tasks = localStorage.getItem('tasks');
        let tasksObj = tasks ? JSON.parse(tasks) : [];
        
        tasksObj.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasksObj));
        showTasks();
        console.log(`Task ${index + 1} deleted.`);
    };

    // Display tasks
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

        document.getElementById('ulTasks').innerHTML = tasksObj.length ? html : '';
        document.getElementById('messageBox').style.display = tasksObj.length ? 'none' : 'block';
        console.log("Tasks displayed.");
    }

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
            'clouds': 'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638884972/EducationHub/photos/blue-mist.jpg', 
            'rain': 'https://arewaworld.com/wp-content/uploads/2023/10/unnamed.jpg',   
            'drizzle': 'https://cdn.windy.app/site-storage/posts/October2023/nature-grass-snow-fog-mist-morning-41797-pxhere.com.jpg', 
            'snow': 'https://fournews-assets-prod-s3-ew1-nmprod.s3.amazonaws.com/media/2017/12/snow_london_g_hd.jpg',
            'mist': 'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638884972/EducationHub/photos/blue-mist.jpg',   
            'thunderstorm': 'https://www.reconnectwithnature.org/getmedia/a2de823c-a1ae-491e-a47b-f373af403d4e/Thunderstorm-lightning-strike-shutterstock_1.jpg?width=1500&height=1000&ext=.jpg', 
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
