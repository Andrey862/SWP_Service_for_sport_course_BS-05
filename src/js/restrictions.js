let current = window.localStorage.getItem('id');
let token = window.localStorage.getItem('token');


if (!current || !token) {
	window.location.href = 'login.html';
}
