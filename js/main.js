let list = [];
let user = JSON.parse(localStorage.getItem("user"));

function isLoged() {
    let token = localStorage.getItem("token");
    if (!token) {
        window.location.assign("login.html")
    }
    else {
        // let user = JSON.parse(localStorage.getItem("user"));
        fetch(`https://jsonplaceholder.typicode.com/users/${user.data.id}/todos`)
            .then(res => res.json())
            .then(data => {
                // debugger;
                list = data;
                console.log(list);
                console.table(data);
            })
    }
}

isLoged()

function logout() {
    localStorage.removeItem("token");
    window.location.assign("login.html")
}