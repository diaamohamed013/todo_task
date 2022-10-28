let registerForm = document.querySelector("form");
let regError = document.querySelector(".passError");

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const prePayload = new FormData(registerForm);
    const payload = new URLSearchParams(prePayload);

    // console.log([...payload]);

    fetch(`https://reqres.in/api/register`, {
        method: 'POST',
        body: payload
    })
        .then(res => res.json())
        .then(data => {
            debugger;

            if (data.token) {
                localStorage.setItem("token", data.token);
                if (data.id) {
                    fetch(`https://reqres.in/api/users/${data.id}`)
                        .then(res => res.json())
                        .then(data => {
                            // debugger;
                            localStorage.setItem("user" , data)
                            // console.table(data)
                            // debugger;
                            setTimeout(() => {
                                window.location.assign("index.html");
                            }, 0)
                        })
                }

                // setTimeout(() => {
                //     window.location.assign("index.html");
                // }, 0)
            } else {
                // alert(data.error)
                regError.innerHTML = data.error
            }
            // alert("valid user");

        })
        .then(err => {
            // debugger;
            // alert(err.error)
        })
})