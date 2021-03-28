(function dayToday() {
    const dateDiv = document.querySelector('.date');
    const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dateObj = new Date();
    const dayNumber = dateObj.getDay();

    dateDiv.appendChild(document.createTextNode(daysArray[dayNumber]));
} ())

function timeNow(){
    const clockDiv = document.querySelector('.clock');

    const dateObj = new Date();
    const hours = (dateObj.getHours() < 10) ? '0' + dateObj.getHours() : dateObj.getHours();
    const minute = (dateObj.getMinutes() <  10) ? '0' + dateObj.getMinutes() : dateObj.getMinutes();
    const seconds = (dateObj.getSeconds() < 10) ? '0' + dateObj.getSeconds() : dateObj.getSeconds();

    clockDiv.innerHTML = `${hours}:${minute}:${seconds}`;
}
setInterval(timeNow, 1000);

const form = document.querySelector('.app-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const emptyList = document.querySelector('.list-empty');
const taskList = document.querySelector('.collection');

loadEventListeners()

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    filter.addEventListener('keyup', filterTask);
}

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    if(tasks.length <= 0){
        if(emptyList.classList.contains('d-none')){
            emptyList.classList.remove('d-none');
            emptyList.classList.add('d-block');
        }
    }else{
        if(emptyList.classList.contains('d-block')){
            emptyList.classList.remove('d-none');
            emptyList.classList.add('d-none');
        }
    }

    tasks.forEach(task => {
        //create li element
        const li = document.createElement('li');
        //add class to li
        li.className = 'collection-item';
        //append text input value to li
        li.appendChild(document.createTextNode(task));

        //create link a
        const link = document.createElement('a');
        //add class to link
        link.className = 'delete-icon';
        //inner icon to link
        link.innerHTML = '<i class="far fa-trash-alt"></i>';
        //append link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
    });
}

function addTask(e){
    if(taskInput.value === ''){
       taskInput.style.border = '2px solid red';
    }

    if(taskList.children.length + 1 > 0){
        if(emptyList.classList.contains('d-block')){
            emptyList.classList.remove('d-block');
            emptyList.classList.add('d-none');
        }
    }

    if(taskInput.value !== ''){
        taskInput.style.border = 'none';

        //create li element
        const li = document.createElement('li');
        //add class to li
        li.className = 'collection-item';
        //append text input value to li
        li.appendChild(document.createTextNode(taskInput.value));

        //create link a
        const link = document.createElement('a');
        //add class to link
        link.className = 'delete-icon';
        //inner icon to link
        link.innerHTML = '<i class="far fa-trash-alt"></i>';
        //append link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);

        //store in LocalStorage
        storeTaskInLocalStorage(taskInput.value);

        //clear task input
        taskInput.value = '';

    }

    e.preventDefault()
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-icon')){
        e.target.parentElement.parentElement.remove();

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

    if(taskList.children.length < 1){
        if(emptyList.classList.contains('d-none')){
            emptyList.classList.remove('d-none');
            emptyList.classList.add('d-block');
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
       if(taskItem.textContent === task){
           tasks.splice(index, 1);
       }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(task => {
        const taskText = task.firstChild.textContent;
        if(taskText.toLowerCase().includes(text)){
            task.style.display = 'flex';
        }else{
            task.style.display = 'none';
        }
    })
}