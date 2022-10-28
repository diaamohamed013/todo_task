// let nameInp = document.querySelector("#name");
// let regEmailInp = document.querySelector("#registerEmail");
// let regPasswordInp = document.querySelector("#registerPassword");
let Form = document.querySelector("form");
let logError = document.querySelector(".Error");

Form.addEventListener("submit", function (e) {
    e.preventDefault();
   
    const prePayload = new FormData(Form);
    const payload = new URLSearchParams(prePayload);

    // console.log([...payload]);

    fetch(`https://reqres.in/api/login`, {
        method: 'POST',
        body: payload
    })
        .then(res => res.json())
        .then(data => {
            // debugger;
            
            if(data.token){
                localStorage.setItem("token", data.token);
                setTimeout(() => {
                    window.location.assign("index.html");
                }, 0)
            }else{
                // alert(data.error)
                logError.innerHTML = data.error;
            }
            // alert("valid user");
            
        })
        .then(err => {
            // debugger;
            // alert(err.error)
        })
})