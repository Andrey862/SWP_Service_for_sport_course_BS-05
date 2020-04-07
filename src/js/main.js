const inputs = document.querySelectorAll('.input');

function focusFunc(){
	let parent = this.parentNode.parentNode;
	parent.classList.add('focus');
}

function blurFunc(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove('focus');
	}
}

inputs.forEach(input =>{
	input.addEventListener('focus', focusFunc);
	input.addEventListener('blur', blurFunc);
});


document.getElementById('login_btn').onclick = function validation() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;

	var admin_u = "admin";
	var admin_p = "admin";

	var trainer_u = "trainer";
	var trainer_p = "trainer";

	var student_u = "student";
	var student_p = "student";

	if (username == admin_u && password == admin_p) {
		window.location.href = 'admin.html';
	} else if (username == trainer_u && password == trainer_p) {
		window.location.href = 'trainer.html';
	} else if (username == student_u && password == student_p) {
		window.location.href = 'student.html';
	} else {
		document.getElementById('notice').innerHTML = "Wrong username or/and password";
	}
}

document.getElementById('my_statistics').onclick = function validation() {
    window.location.href = 'student.statistics.html';
}
