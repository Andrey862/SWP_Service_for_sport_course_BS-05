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


document.getElementById('signup_btn').onclick = async function validation() {
    var fname = document.getElementById('first_name').value;
    var lname = document.getElementById('last_name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var password_conf = document.getElementById('password_conf').value;
    
   // email_validation(email)

    if (password != password_conf) {
        alert("Passwords do not match!\nPlease, try again.");
        return 0;
    }

    let result = await registerStudent(fname, lname, email, password)

    if (result) {
        alert("You successfully registered");

        window.location.href = 'login.html';
    } else {
        alert("Error")
        return
    }
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
        return true
    } else {
        alert(response.statusText)
        return false
    }
}

/*function email_validation(email){
	
	var pattern = /^[a-z]{1,1}\.[a-z]+@[innopolis]\.[university]$/
	
	if (email.search(pattern) == 0){
		alert('Invalid form of email'
		return 0;
	}
}*/
