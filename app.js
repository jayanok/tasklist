// Define UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const cleanBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector("#filter");
const taskInput = document.querySelector('#task');

// Load all event listeners

loadEventListeners();

// load all event listeners 

function loadEventListeners() {
    //Dom load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task form 
    form.addEventListener('submit', addTask);
    //remove task event 
    taskList.addEventListener('click', removeTask)
    // clear tasks events
    cleanBtn.addEventListener('click', clearTasks);
    //filter tasks event 
    filter.addEventListener('keyup', filterTasks);

}

// get tasks from LS

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (tasks) {

        // Create li element
    const li = document.createElement('li');
    
    // Add class
    li.className = 'collection-item';
    //create a new node and append to li

    li.appendChild(document.createTextNode(tasks));
    // create new link elements

    const link = document.createElement('a');
    //add class

    link.className = 'delete-item secondary-content';
    // add icon html

    link.innerHTML = '<i class="fa fa-remove"></>';

    // append the link to li

    li.appendChild(link);
    //append the li to ul
    console.log(link);

    taskList.appendChild(li);

        
    })

}


// Add task

function addTask(e){
    console.log(e);

    if(taskInput.value === ''){

        alert('Add a task');


    }else {
    // Create li element
    const li = document.createElement('li');
    
    // Add class
    li.className = 'collection-item';
    //create a new node and append to li

    li.appendChild(document.createTextNode(taskInput.value));
    // create new link elements

    const link = document.createElement('a');
    //add class

    link.className = 'delete-item secondary-content';
    // add icon html

    link.innerHTML = '<i class="fa fa-remove"></>';

    // append the link to li

    li.appendChild(link);
    //append the li to ul
    console.log(link);

    taskList.appendChild(li);
    
    
    // StoreTasks in local storage

    storeTaskInLocalStorage(taskInput.value);

    // clear input 
    
    taskInput.value = '';

    e.preventDefault();
    }

}

// store task 

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// remove task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){

        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove()

        }

        // remove from LS

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
       

        //console.log(e.target);
    
    }
    

}

// Remove from LS
function removeTaskFromLocalStorage(tasksItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null ){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (tasksItem.textContent === task){
            tasks.splice(index, 1);
        }
        
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    
}

//clear tasks

function clearTasks(e) {
    //taskList.innerHTML = ''; // one way of clearing all taks 

    // faster methods by while method
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);

    }
    if (confirm("Are you sure ?")){
        clearTasksFromLocalStorage();

    }

  

    
}

//clear tasks from local storage

function clearTasksFromLocalStorage() {
    localStorage.clear();
    
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

    
}