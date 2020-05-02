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


document.getElementById('signup_btn').onclick = function validation() {
    var fname = document.getElementById('first_name').value;
	var lname = document.getElementById('last_name').value;
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;

	console.log( fname );
	console.log( lname );
	console.log( email );
	console.log( password );

	// window.location.href = 'login.html';
}
