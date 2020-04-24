function Course(props) {

    return (
        <div className="card">
            <div className="container1">
                <h3 className="name">{props.course.name}</h3>
				<p>{props.course.trainer}</p>
				<p className="schedule">{props.course.schedule}</p>
            </div>


            <div className="container2">
                <button className="btn" id={props.course.id}><a>Change</a></button>
            </div>


            <div className="container3">
                <div>
                    <h3>New Schedule</h3>
                    <input className="input" type="text" id={"schedule" + props.course.id}/>
                </div>
            </div>
        </div>
    )
}

class App extends React.Component {

    state = getAllCourses()

    render() {
        return (
            <div className="app">

				<div className="title">
					<h2> Change schedule </h2>
				</div>

                <div className="list">
                    {this.state.courses.map(course => {
                        return (
                            <Course course={course} key={course.name + Math.random()}/>
                        )
                    })}
                </div>

            </div>
        )
    }
}


function getAllCourses() {
    var courses = []

    const url = "http://194.87.102.88/api/groups/";

    // Create a request variable and assign a new XMLHttpRequest object to it.
    const request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, false)

    // Send request
    request.send()

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
                id: course["id"],
                name: course["name"],
                trainer: course["trainer"]["first_name"],
                schedule: sch["schedule"]
            })
        }
    )

    return {courses: courses}
}

//function add event handler on buttons clicks
function addEventHandler() {
    const url = "http://194.87.102.88/api/groups/";

    // Create a request variable and assign a new XMLHttpRequest object to it.
    const request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', url, true)

    request.onload = function () {
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            data.forEach(user => {
                document.getElementById(user['id']).onclick = handleButtonClick
            })
        } else {
            console.log('error')
        }
    }

    // Send request
    request.send()
}


//make post request to api to change schedule
function handleButtonClick() {
    const courseId = this.id
    const newSchedule = document.getElementById("schedule" + courseId).value;

    if (newSchedule) {
        saveSchedule(newSchedule, courseId)
    } else {
        alert(`Empty schedule: please, fill the field`)
    }
}

function saveSchedule(newSchedule, courseId) {
    const url = `http://194.87.102.88/api/groups/${courseId}/`

    const data = {
        schedule: newSchedule
    }

    const json = JSON.stringify(data);

    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
    })
        .then(response => {
            if (response.status >= 200 && response.status < 400) {
                alert(`You successfully change schedule to: ${newSchedule}`)
            } else {
                alert("Server side error")
            }
        })
}


ReactDOM.render(<App/>, document.getElementById('root'))


addEventHandler()
