const form = document.getElementById("taskForm")
const tasks = document.getElementById("tasks")

form.addEventListener("submit", ev => {
    ev.preventDefault()

    let newTask = ev.target.task.value

    if(!tasks.childNodes[0]?.hasChildNodes()) showTasksList(true)
    addNewTask(newTask)
})

tasks.addEventListener("click", ev => {
    if(ev.target.tagName === "BUTTON"){
        deleteTask(ev.target.parentElement)
        if(!tasks.childNodes[0]?.hasChildNodes()) showTasksList(false)
    }
})

const addNewTask = (task) => {
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

    const taskContent = document.createElement("span")
    taskContent.classList.add("task__content")
    taskContent.textContent = task;

    const deleteButton = document.createElement("button")
    deleteButton.classList.add("task__deleteButton")
    deleteButton.textContent = "x"

    newTask.appendChild(taskContent)
    newTask.appendChild(deleteButton)

    tasksList.appendChild(newTask);
    form.task.value = "";
}

const deleteTask = (task) => {
    tasks.childNodes[0].removeChild(task)
}

const showTasksList = (show) => {
    if(show) tasks.classList.remove("hidden")
    else tasks.classList.add("hidden")
}