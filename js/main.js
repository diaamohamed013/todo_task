function isLoged(){
    let token = localStorage.getItem("token");
    if(!token){
        window.location.assign("login.html")
    }
    else{
        let user = localStorage.getItem("user");
    }
}

isLoged()

function logout(){
    localStorage.removeItem("token");
    window.location.assign("login.html")
}