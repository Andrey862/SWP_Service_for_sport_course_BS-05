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


document.getElementById('login_btn').onclick = async function validation() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var admin_u = "admin";
    var admin_p = "admin";

    var trainer_u = "trainer";
    var trainer_p = "trainer";

    var student_u = "student";
    var student_p = "student";

    let data = await authentification(username, password)
    let id = data['id']
    let token = data['token']

    // alert(`Get: ${id} ${token}`)

    let typeOfUser = await getTypeOfUser(id, token)

    alert(`Type: ${typeOfUser}`)

    switch (typeOfUser) {
        case "student": {
            window.location.href = 'student.html';
        }
        case "admin": {
            window.location.href = "admin.html"
        }
        case "trainer": {
            window.location.href = "trainer.html"
        }
    }

    // if (username == admin_u && password == admin_p) {
    //     window.location.href = 'admin.html';
    // } else if (username == trainer_u && password == trainer_p) {
    //     window.location.href = 'trainer.html';
    // } else if (username == student_u && password == student_p) {
    //     window.location.href = 'student.html';
    // } else {
    //     document.getElementById('notice').innerHTML = "Wrong username or/and password";
    // }
}

async function authentification(email, password) {
    let url = "http://194.87.102.88/api/auth/"


    const data = {
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

    return text
}

async function getTypeOfUser(id, token) {
    let url = `http://194.87.102.88/api/users/${id}`;


    alert(`Get type: ${id} ${token}`);

    // const data = {
    //     id: id
    // }

    const json = JSON.stringify(data);

    let response = await fetch(url, {
        method: 'GET',
        headers:
            {
                'Authorization': `Token ${token}`
            }
    });

    let text = await response.json();

    return text
}


document.getElementById('my_statistics').onclick = function validation() {
    window.location.href = 'student.statistics.html';
}
