class Task{
    constructor(description, status){
       this.description = description;
       this.status = status;
    }
}

let tasks = [
    new Task('pack spikes for track meet', 'todo'), 
    new Task('make my bed', 'todo'), 
    new Task('walk the dog', 'todo'),
    new Task('write draft english paper', 'doing'),
    new Task('sanding art project', 'doing'),
    new Task('wash the dishes', 'done'),
    new Task('finish math homework', 'done'),
    new Task('practice my trumpet', 'done')];
            
function drawCard(index, task){
    return `<div id="task-${index}" class="card">
        <div class="task-menu">
            <div class="menu-bar  ${task.status}">...</div>
            <ul class="task-menu-items">
                <li><a id="edit-task-${index}">Edit</a></li>
                <li><a id="delete-task-${index}" onClick="deleteTask(${index}); return false;">Delete</a></li>
            </ul>
        </div>
        ${task.description}
    </div>`
}

function drawTodoCards(){
    let output = '';
    tasks.forEach((task, index) => {
        if(task.status == 'todo'){
            output += drawCard(index, task);
        }
    });
    
    return output;
}

function drawDoingCards(){
    let output = '';
    
    tasks.forEach((task, index) => {
        if(task.status == 'doing'){
            output += drawCard(index, task);
        }
    });
    
    return output;
}



function drawDoneCards(){
    let output = '';
    
    tasks.forEach((task, index) => {
        if(task.status == 'done'){
            output += drawCard(index, task);
        }
    });
    
    return output;
}

function drawAllCards(){
    document.getElementById('todo-cards').innerHTML = drawTodoCards();
    document.getElementById('doing-cards').innerHTML = drawDoingCards();
    document.getElementById('done-cards').innerHTML = drawDoneCards();
}

function createTask(){
    let description = document.getElementById('task-description').value;
    let status = document.getElementById('task-status').value;
    
    let task = new Task(description, status);
    
    tasks.push(task);
    
    drawAllCards();
}

function deleteTask(id){
    tasks.splice(id, 1);
    
    drawAllCards();
}

function editTask(id){
    let task = tasks[id];
    
    document.getElementById('task-id').value = id;
    document.getElementById('task-description').value = task.description;
    document.getElementById('task-status').value = task.status;
    document.getElementById('add-task').innerHTML = 'Update';
}

drawAllCards();
