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
	show_trainers()
    document.getElementById("signup_btn").onclick = registerTrainer
}


async function registerTrainer() {

  
    const data = {
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        password_conf : document.getElementById("password_conf").value,
        is_trainer: true
    }

	if (!email_validation(email.value)){
		alert('Invalid form of email');
		return 0;
	}

    if (password.value != password_conf.value) {
        alert("Passwords do not match!\nPlease, try again.");
        return 0;
    }

    registerStudent(data.first_name, data.last_name, data.email, data.password)
    
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

function show_trainers(){
	
	var table = document.getElementById("table_trainer");
	var row = table.insertRow(table.rows.length);
	var cell = row.insertCell(0).outerHTML = "<th class='name' colspan='2'>" + "Name_Surname Email"  + "</th>";
	// var cell = row.insertCell(1).outerHTML = "<th class='name'>" + "Surname" + "</th>";
	// var cell = row.insertCell(1).outerHTML = "<th class='name'>" + "Email" + "</th>";
	
	const url = "http://194.87.102.88/api/users/?is_trainer=true"
	
    // Create a request variable and assign a new XMLHttpRequest object to it.
    const request = new XMLHttpRequest()
	
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, false)
	request.setRequestHeader('Authorization', `Token ${token}`)
    // Send request
    request.send()

    JSON.parse(request.responseText).forEach(st => {
			 
			
		var row = table.insertRow(table.rows.length);
		
        inf = st['first_name'] + " " + st['last_name'];

		var cell = row.insertCell(0).outerHTML = "<td class='info'>"  +  inf + "</td>";
		// var cell = row.insertCell(1).outerHTML = "<td class='info'>"  +  + "</td>";
		var cell = row.insertCell(1).outerHTML = "<td class='info'>" + st['email']  + "</td>";

    })
	
}

function email_validation(email){
	
	regexp1 = new RegExp();
	regexp2 = new RegExp();
	
	var regexp1 = /^[a-z]+\.[a-z]+@innopolis.university$/
	var regexp2 = /^[a-z]+\.[a-z]+@innopolis.ru$/
	
	if (regexp1.test(email)){return true}
	else if (regexp2.test(email)) {return true}
	else {return false}
	
}

addEventHandler()



