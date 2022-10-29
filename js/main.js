let list = [];
let user = JSON.parse(localStorage.getItem("user"));
let myData = document.querySelector(".dataContainer");
let dataComplated = document.querySelector(".dataComplated")
let dataForm = document.querySelector("form");
let taskInp = document.querySelector("#taskInp");
let taskErr = document.querySelector("#taskErr");
// let dataview = document.querySelector(".dataContainer #dataview");

function isLoged() {
    let token = localStorage.getItem("token");
    if (!token) {
        window.location.assign("register.html")
    }
    else {
        // let user = JSON.parse(localStorage.getItem("user"));
        fetch(`https://jsonplaceholder.typicode.com/users/${user.data.id}/todos`)
            .then(res => res.json())
            .then(data => {
                // debugger;
                list = data;
                // console.log(list);
                console.table(data);
            })
    }
}
isLoged()
function logout() {
    localStorage.removeItem("token");
    window.location.assign("login.html")
}

if (localStorage.getItem("tasks")){
    list = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

dataForm.addEventListener("submit", (e) => {
    e.preventDefault();
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
    console.table(task);
    viewTasks(list);
    saveToLocalStorage(list);
}

function viewTasks(list) {
    myData.innerHTML = '';
    let cartona = ``;
    let completedCartona = ``;
    list.map((item) => {
        if (item.completed) {
            document.querySelector(".data h3").classList.replace("d-none" , "d-block")
            completedCartona += `  
                <div class="dataView" id="dataview">
                    <div class="dataTitle">
                        ${item.title}
                    </div>
                </div>          
                    `
        } else {
            cartona += `  
                <div class="dataView" id="dataview">
                    <div class="dataTitle">
                        ${item.title}
                    </div>
                    <div class="dataProcess">
                        <button class="btn text-success">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn text-dark">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button class="btn text-danger">
                            <i class="fas fa-trash-can"></i>
                        </button>
                    </div>
                </div>          
                    `
        }

    });
    dataComplated.innerHTML = completedCartona;
    myData.innerHTML = cartona;
}

function saveToLocalStorage (list){
    localStorage.setItem("tasks" , JSON.stringify(list));
}

function getDataFromLocalStorage(){
    let getData = localStorage.getItem("tasks");
    if(getData){
        let tasks = JSON.parse(getData);
        viewTasks(tasks);
        // console.log(tasks)
    }
}