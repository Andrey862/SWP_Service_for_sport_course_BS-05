let current = window.localStorage.getItem('id');
let token = window.localStorage.getItem('token');

const inputs = document.querySelectorAll('.input');

function focusFunc() {
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}

function blurFunc() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove('focus');
    }
}

inputs.forEach(input => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFunc);
});


//function add event handler on buttons clicks
function addEventHandler() {
    document.getElementById("signup_btn").onclick = registerTrainer
}


async function registerTrainer() {

    // const url = `http://194.87.102.88/api/users`;
    //


    const data = {
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        is_trainer: true
    }

    registerStudent(data.first_name, data.last_name, data.email, data.password)
    // changestudentToTrainer()
    //
    //
    // if (data.first_name && data.last_name && data.email && data.password) {
    //
    //     alert("Token: " + token +  " " + current)
    //
    //     let response = await fetch(url, {
    //
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers:
    //             {
    //                 'Authorization': `Token ${token}`,
    //                 "Content-type": "application/json; charset=UTF-8"
    //             }
    //     });
    //
    //
    //     let text = await response.json();
    //     let result = response.ok
    //
    //     alert('Result: ' + text + result)
    //
    // } else {
    //     // alert(`
    //     //             Please, fill all fields`)
    //     return
    // }
}

async function registerStudent(first_name, last_name, email, password) {
    const url = `http://194.87.102.88/api/register/`
    //
    const data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    }

    const json = JSON.stringify(data);

    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
    });

    let text = await response.json()

    let result = response.ok

    if (result) {
        window.localStorage.setItem('id', text['id']);
        window.localStorage.setItem('token', text['token']);
        changestudentToTrainer(text['id'], text['token'])
        return true
    } else {
        alert(response.statusText)
        return false
    }
}

function changestudentToTrainer(id) {
    const url = `http://194.87.102.88/api/users/${id}/`

    const data = {
        is_trainer: true,
        is_student: false,
        is_manager: false
    }

    const json = JSON.stringify(data);

    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers:
            {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${token}`
            }
    })
        .then(response => {
            if (response.status >= 200 && response.status < 400) {
                alert("You registered trainer")
            } else {
                alert("Error during changing")
            }
        })
}

addEventHandler()



