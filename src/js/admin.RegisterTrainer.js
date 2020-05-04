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

    // state = getAllCourses()

    render() {
        return (


            <div className="app">

                {/*<div className="container5">*/}

                {/*	<div className="title">*/}
                {/*		<h2> Change schedule </h2>*/}
                {/*	</div>*/}

                {/*	<div className="list">*/}
                {/*		{this.state.courses.map(course => {*/}
                {/*			return (*/}
                {/*				<Course course={course} key={course.name + Math.random()}/>*/}
                {/*			)*/}
                {/*		})}*/}
                {/*	</div>*/}
                {/*</div>*/}

                <div className="container6">

                    <div className="title2">
                        <h2> Register trainer </h2>
                    </div>

                    <div className="card2">


                        <div className="container7">

                            <h3>First name</h3>
                            <input className="input" type="text" id="firstName"/>

                            <h3>Last name</h3>
                            <input className="input" type="text" id="lastName"/>

                            <h3>Email</h3>
                            <input className="input" type="text" id="email"/>

                            <h3>Password</h3>
                            <input className="input" type="text" id="password"/>
                        </div>

                        <div className="container8">
                            <button className="btn" id="RegisterTrainer"><a>Register</a></button>
                        </div>

                    </div>

                </div>
            </div>

        )
    }
}


//function add event handler on buttons clicks
function addEventHandler() {
    document.getElementById("RegisterTrainer").onclick = registerTrainer
}


async function registerTrainer() {
    const url = `http://194.87.102.88/api/users`;

    const data = {
        first_name: document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        is_student: false,
        is_manager: false,
        is_trainer: true
    }

    if (data.first_name && data.last_name && data.email && data.password) {

        let response = await fetch(url, {

            method: 'POST',
            body: JSON.stringify(data),
            headers:
                {
                    'Authorization': `Token ${
                        window.localStorage.getItem('token')}`,
                    "Content-type": "application/json; charset=UTF-8"
                }
        });


        let text = await response.json();
        let result = response.ok

        alert('Result: ' + text + result)

    } else {
        alert(`
                    Please, fill all fields`)
        return
    }
}


ReactDOM.render(<App/>, document.getElementById('root'))

addEventHandler()



