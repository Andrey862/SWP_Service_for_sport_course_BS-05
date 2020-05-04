let current = window.localStorage.getItem('id');
let token = window.localStorage.getItem('token');

var hh = 0;

function show_students(){
	
	var table = document.getElementById("table");
	var row = table.insertRow(table.rows.length);
	var cell = row.insertCell(0).outerHTML = "<th class='hours'>" + "Name" + "</th>";
	var cell = row.insertCell(1).outerHTML = "<th class='hours'>" + "Surname" + "</th>";
	var cell = row.insertCell(2).outerHTML = "<th class='hours'>" + "Email" + "</th>";
	
	const url = "http://194.87.102.88/api/users/?is_student=true"
	
    // Create a request variable and assign a new XMLHttpRequest object to it.
    const request = new XMLHttpRequest()
	
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, false)
	request.setRequestHeader('Authorization', `Token ${token}`)
    // Send request
    request.send()

    JSON.parse(request.responseText).forEach(st => {
			 
			
		var row = table.insertRow(table.rows.length);
		
		var cell = row.insertCell(0).outerHTML = "<td class='date'>"  + st['first_name']  + "</td>";
		var cell = row.insertCell(1).outerHTML = "<td class='date'>"  + st['last_name'] + "</td>";
		var cell = row.insertCell(2).outerHTML = "<td class='date'>"  +  st['email']  + "</td>";

    })
	
}
