let list = [];
let user = JSON.parse(localStorage.getItem("user"));
let myData = document.querySelector(".dataContainer");
let dataComplated = document.querySelector(".dataComplated");
let taskInp = document.querySelector("#taskInp");
let taskErr = document.querySelector("#taskErr");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");


function isLoged() {
    let token = localStorage.getItem("token");
    if (!token) {
        window.location.assign("register.html")
    }
    else {
        fetch(`https://jsonplaceholder.typicode.com/users/${user.data.id}/todos`)
            .then(res => res.json())
            .then(data => {
                list = data;
            })
    }
}
isLoged();
function logout() {
    localStorage.removeItem("token");
    window.location.assign("register.html");
}

if (localStorage.getItem("tasks")) {
    list = JSON.parse(localStorage.getItem("tasks"));
    viewTasks(list);
}

getDataFromLocalStorage();

addBtn.addEventListener("click", () => {
    if (taskInp.value !== '') {
        taskErr.innerHTML = '';
        addTask(taskInp.value);
        taskInp.value = '';
    }
    else {
        taskErr.innerHTML = 'Please Enter Data';
    }
})

function addTask(taskTitle) {
    const task = {
        userId: user.data.id,
        id: Date.now(),
        title: taskTitle,
        completed: false
    }
    list.push(task);
    // console.table(task);
    viewTasks(list);
    saveToLocalStorage(list);
}

function viewTasks(list) {
    let cartona = ``;
    let completedCartona = ``;
    for (let i = 0; i < list.length; i++) {
        if (list[i].completed) {
            document.querySelector(".data h3").classList.replace("d-none", "d-block")
            completedCartona += `  
                <div class="dataView" id="dataview">
                    <div class="dataTitle">
                        ${list[i].title}
                    </div>
                </div>          
                    `
        } else {
            cartona += `  
                <div class="dataView" id="dataview">
                    <div class="dataTitle">
                        ${list[i].title}
                    </div>
                    <div class="dataProcess">
                        <button class="btn text-success" onClick = "checkCompleteTask(${list[i].id})">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn text-dark" onClick = "editTask(${list[i].id})">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button class="btn text-danger" onClick = "deleteOneTask(${i})">
                            <i class="fas fa-trash-can"></i>
                        </button>
                    </div>
                </div>          
                    `
        }
    }
    dataComplated.innerHTML = completedCartona;
    myData.innerHTML = cartona;
}

function saveToLocalStorage(list) {
    localStorage.setItem("tasks", JSON.stringify(list));
}

function getDataFromLocalStorage() {
    let getData = localStorage.getItem("tasks");
    if (getData) {
        let tasks = JSON.parse(getData);
        viewTasks(tasks);
    }
}

function deleteOneTask(index) {
    list.splice(index, 1);
    saveToLocalStorage(list);
    viewTasks(list);
}

let globalId;

function editTask(id) {
    globalId = id;
    console.log(globalId)
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            taskInp.value = list[i].title;
            updateBtn.classList.replace("d-none", "d-inline-block");
            addBtn.classList.add("d-none");
        }
    }
}

function updateTask() {
    list.forEach((item) => {
        if (item.id == globalId) {
            item.title = taskInp.value;
        }
    }
    )
    saveToLocalStorage(list);
    viewTasks(list);
    addBtn.classList.replace("d-none", "d-inline-block");
    updateBtn.classList.add("d-none");
    clearForm();
}

function checkCompleteTask(taskId) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == taskId) {
            list[i].completed == false ? list[i].completed = true : list[i].completed = false
        }
    }
    saveToLocalStorage(list);
    viewTasks(list);
}

function clearForm() {
    taskInp.value = "";
}