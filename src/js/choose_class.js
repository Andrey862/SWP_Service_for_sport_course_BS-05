function Course(props){
	return (
		<div className="card">
			<div className="container1">
				<h3 className="name">{props.course.name}</h3>
				<p>{props.course.trainer}</p>
				<p className="schedule">{props.course.schedule}</p>	
			</div>

			<div className="container2">
				<button className="btn" id={props.course.id}><a>Choose</a></button>	
			</div>	

		</div>	
	)
}

class App extends React.Component {

	state = getAllCourses()

	render(){
		return (
			<div className="app">
			
				<div className="title">
					<h2> Choose class </h2>
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

function getAllCourses(){
	var courses = []

	const url = "http://194.87.102.88/api/groups/";

    // Create a request variable and assign a new XMLHttpRequest object to it.
    const request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, false);

    // Send request
    request.send();

    JSON.parse(request.responseText).forEach(course => {
			
			const url2 = course['url'];
			const request2 = new XMLHttpRequest();
			//alert(url);
			// Open a new connection, using the GET request on the URL endpoint
			request2.open('GET', url2, false);

			// Send request
			request2.send();
			//alert(request2.responseText);
			
			let sch = JSON.parse(request2.responseText);
			
            courses.push({
				url: course["url"],
                id: course["id"],
                name: course["name"],
                trainer: course["trainer"]["first_name"] + " " + course["trainer"]["last_name"],
                schedule: sch["schedule"]
                
            })
        }
    );
    
    

    return {courses: courses}
}


ReactDOM.render(<App />, document.getElementById('root'))






