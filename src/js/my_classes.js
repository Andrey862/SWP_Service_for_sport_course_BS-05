var current = window.localStorage.getItem('id');
var token = window.localStorage.getItem('token');

function Course(props){
	return (
		<div className="card">
			<div className="container1">
				<h3 className="name">{props.course.name}</h3>
				<p>{props.course.trainer}</p>
				<p className="schedule">{props.course.schedule}</p>	
			</div>

			<div className="container2">
				<button className="btn" id={props.course.id} onClick={e => handleButtonClick(props.course.id)}><a>Delete</a></button>	
			</div>	

		</div>	
	)
}

class App extends React.Component {

	state = getMyClasses()

	render(){
		return (
			<div className="app">

				<div className="title">
					<h2> My classes </h2>
				</div>

				<div className="list">
					{ this.state.courses.map(course => {
						return (
							<Course course={course} key={course.name + Math.random()} />
						)
					})	}
				</div>

			</div>

			
		)
	}


}

function getMyClasses(){

	var courses = []
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
			sch["students"].forEach(student => {
					
					if (student["id"] == current){
						courses.push({
							id: course["id"],
							name: course["name"],
							trainer: course["trainer"]["first_name"] + " " + course["trainer"]["last_name"],
							schedule: sch["schedule"]
						})	
					}
			}) 

            
        }
    )

    return {courses: courses}

}

function handleButtonClick(id) {
	
	    
    const group_url = "http://194.87.102.88/api/groups/";
    
    const request = new XMLHttpRequest()
    

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', group_url, false)
	request.setRequestHeader('Authorization', `Token ${token}`)
    // Send request
    request.send()

    JSON.parse(request.responseText).forEach(course => {

		if(id == course['id']){
			const url2 = course['url'];
			const request2 = new XMLHttpRequest()

			// Open a new connection, using the GET request on the URL endpoint
			request2.open('GET', url2, false)
			request2.setRequestHeader('Authorization', `Token ${token}`)
			// Send request
			request2.send()

			let group = JSON.parse(request2.responseText);
			
			var arr = []
			group['students'].forEach(st => {
				if (st['id'] != current){
					arr.push(st['id'])
				}
			})
			
			const newData = {
				id: course['id'],
				name: course['name'],
				schedule: group['schedule'],
				trainer: group['trainer']['id'],
				students: arr
			}
			
			
			const json = JSON.stringify(newData);
			
			
			//send new data to API
			fetch(url2, {
				method: 'PATCH',
				body: JSON.stringify(newData),
				headers:
					{
						"Content-type": "application/json; charset=UTF-8",
						"Authorization": `Token ${token}`
					}
			})
			.then(response => {
				if (response.status >= 200 && response.status < 400) {
					alert('You successfully left ' + group['name'] + ' class')
					
				} else {
					alert("Server side error")
				}
			})
			
		}
			
	})
    
	
    
}

ReactDOM.render(<App />, document.getElementById('root'))






