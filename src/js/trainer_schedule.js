var current = window.localStorage.getItem('id');
var token = window.localStorage.getItem('token');



function show_schedule(){
	
	var table = document.getElementById("table");
	var row = table.insertRow(table.rows.length);
	var cell = row.insertCell(0).outerHTML = "<th class='hours'>" + "Name" + "</th>";
	var cell = row.insertCell(1).outerHTML = "<th class='hours1'>" + "Time" + "</th>";

	const url = "http://194.87.102.88/api/groups/"

    // Create a request variable and assign a new XMLHttpRequest object to it.
    const request = new XMLHttpRequest()
	
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, false)
	request.setRequestHeader('Authorization', `Token ${token}`)
    // Send request
    request.send()

    JSON.parse(request.responseText).forEach(course => {

			const url2 = course['url'];
			const request2 = new XMLHttpRequest();
			
			// Open a new connection, using the GET request on the URL endpoint
			request2.open('GET', url2, false);
			request2.setRequestHeader('Authorization', `Token ${token}`)
			// Send request
			request2.send();
			
			
			let sch = JSON.parse(request2.responseText);
			
			//show only classes in which student is enrolled
			if (sch["trainer"]["id"] == current){
				var row = table.insertRow(table.rows.length);
		
				var cell = row.insertCell(0).outerHTML = "<td class='date'>"  + course['name']  + "</td>";
				var cell = row.insertCell(1).outerHTML = "<td class='date1'>"  + sch['schedule'] + "</td>";

			}
			

            
        }
    )



}


