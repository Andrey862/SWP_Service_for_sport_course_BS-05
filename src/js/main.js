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
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let data = await authentication(username, password)
    let id = data['id']
    let token = data['token']

    let typeOfUser = await getTypeOfUser(id, token)

    switch (typeOfUser) {
        case "is_student":
            window.location.href = 'student.html';
        case "is_manager":
            window.location.href = "admin.html"
        case "is_trainer":
            window.location.href = "trainer.html"
    }
}

async function authentication(email, password) {
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
    let url = `http://194.87.102.88/api/users/${id}/`;

    let response = await fetch(url, {
        method: 'GET',
        headers:
            {
                'Authorization': `Token ${token}`
            }
    });


    let text = await response.json();
    let userTypes = ["is_student", "is_trainer", "is_manager"];
    var userType = "undefined_type";

    userTypes.forEach(type => {
        if (Boolean(text[type]) == true) {
            userType = type;
        }
    });

    return userType;
}


document.getElementById('my_statistics').onclick = function validation() {
    window.location.href = 'student.statistics.html';
}
