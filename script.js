const form = document.getElementById("taskForm")
const tasks = document.getElementById("tasks")
const dataNum = document.getElementById("taskNum");
const dataComplete = document.getElementById("taskComplete");
let taskNum = 0;
let tasksComplete = 0;

form.addEventListener("submit", ev => {
    ev.preventDefault()
    
    const newTask = ev.target.task.value.trim();
    form.task.value = "";
    
    if(newTask) {
        if(!tasks.firstElementChild?.hasChildNodes()) showTasksList(true)
        addNewTask(newTask)
        tasks.scrollTo(0,tasks.scrollHeight);
    };
})

tasks.addEventListener("click", ev => {
    if(ev.target.tagName === "BUTTON"){
        deleteTask(ev.target.parentElement)
        if(!tasks.firstElementChild?.hasChildNodes()) showTasksList(false)
    }
})

tasks.addEventListener("click", ev => {
    if(ev.target.tagName === "INPUT"){
        if(ev.target.checked){
            tasksComplete += 1;
        } else {
            tasksComplete -= 1;
        }
        updateData();
    }
})

const addNewTask = (task) => {
    taskNum += 1;
    updateData();
    let tasksList;
    if(tasks.childElementCount === 0) {
        tasksList = document.createElement("ul")
        tasksList.classList.add("tasks__list")

        tasks.appendChild(tasksList)
    } else {
        tasksList = tasks.children[0];
    }

    const newTask = document.createElement("li")
    newTask.classList.add("task")

    const taskCheckBox = document.createElement("input")
    taskCheckBox.setAttribute("type","checkbox")
    taskCheckBox.name = "check"
    taskCheckBox.classList.add("task__check")
    taskCheckBox.setAttribute("title","Check Task")

    const taskContent = document.createElement("span")
    taskContent.classList.add("task__content")
    taskContent.textContent = task;

    const deleteButton = document.createElement("button")
    deleteButton.classList.add("task__deleteButton")
    deleteButton.textContent = "x"
    deleteButton.setAttribute("title","Delete Task")

    newTask.appendChild(taskCheckBox)
    newTask.appendChild(taskContent)
    newTask.appendChild(deleteButton)

    tasksList.appendChild(newTask);
}

const deleteTask = (task) => {
    taskNum -= 1;
    if(task.firstElementChild.checked) tasksComplete -= 1;
    updateData();
    tasks.firstElementChild.removeChild(task);
}

const showTasksList = (show) => {
    if(show) tasks.classList.remove("hidden")
    else tasks.classList.add("hidden")
}


const updateData = () => {
    dataNum.textContent = `${taskNum} Tasks`;
    dataComplete.textContent = `${tasksComplete}/${taskNum} Complete`
}