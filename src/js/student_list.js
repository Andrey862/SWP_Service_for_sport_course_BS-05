let current = window.localStorage.getItem('id');
let token = window.localStorage.getItem('token');

var hh = 0;

async function show_students(){

	var std_fh = {};
	let res = await fetch('http://194.87.102.88/api/hours/', {
        headers:
            {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${token}`
            }
    });
    let data = await res.json();
    for (var i = 0; i < data.length; i++) {
        if (!std_fh.hasOwnProperty(data[i]['student'])) {
            std_fh[data[i]['student']] = 0;
        }
        std_fh[data[i]['student']] += data[i]['hours'];
    }

	
	var table = document.getElementById("table");
	var row = table.insertRow(table.rows.length);
	var cell = row.insertCell(0).outerHTML = "<th class='name' colspan='2'>" + "Full_name Hours Email" + "</th>";
	// var cell = row.insertCell(1).outerHTML = "<th class='name'>" + "Surname" + "</th>";
	// var cell = row.insertCell(2).outerHTML = "<th class='name'>" + "Email" + "</th>";
	
	const url = "http://194.87.102.88/api/users/?is_student=true"
    const request = new XMLHttpRequest()
    request.open('GET', url, false)
	request.setRequestHeader('Authorization', `Token ${token}`)
    request.send()

    JSON.parse(request.responseText).forEach(st => {
		console.log(st);
		if (!std_fh.hasOwnProperty(st['id'])) {
            std_fh[st['id']] = 0;
        }
			
		var row = table.insertRow(table.rows.length);
		var fname = "<span class='fname'>" + st['first_name'] + " " + st['last_name'] + "</span> "
		fname += "<span class='fhours'>" + std_fh[st['id']] + " hours</span> ";
		
		var cell = row.insertCell(0).outerHTML = "<td class='info'>"  + fname + "</td>";
		// var cell = row.insertCell(0).outerHTML = "<td class='info'>"  + st['first_name']  + "</td>";
		// var cell = row.insertCell(1).outerHTML = "<td class='info'>"  + st['last_name']+ "</td>";
		var cell = row.insertCell(1).outerHTML = "<td class='info'>"  + "<span class='email'>" + st['email']  + "</span> </td>";

    })
	
	console.log( std_fh );
}
