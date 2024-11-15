let input = document.querySelector(".inp");
let btn = document.querySelector(".btn");
let list = document.querySelector(".list");


let arrayTasks = [];
if (localStorage.getItem("tasks")) {
    arrayTasks = JSON.parse(localStorage.getItem("tasks"));
}
getData();

btn.onclick = function() {
    if (input.value !=="") {
        addtask(input.value);
        input.value = "";
    }
}

list.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
    }
    delTask(e.target.parentElement.getAttribute("data.id"));
    
})

function addtask(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayTasks.push(task);
    addElements(arrayTasks);
    addData(arrayTasks)
}

function addElements(arrayTasks) {
    list.innerHTML = "";
    arrayTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if (task.completed){
            div.className = "task done";   
        }
        div.setAttribute("data.id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let button = document.createElement("button");
        button.className = "del";
        button.appendChild(document.createTextNode("X"));
        div.appendChild(button);
        list.appendChild(div);
    });
}

function addData(arrayTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(    arrayTasks));
}

function getData() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElements(tasks);
    }
}

function delTask(taskId){
    arrayTasks = arrayTasks.filter((task) => task.id != taskId)
    addData(arrayTasks);
}