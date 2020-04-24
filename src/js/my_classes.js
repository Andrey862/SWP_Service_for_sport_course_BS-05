function Course(props){
	return (
		<div className="card">
			<div className="container1">
				<h3 className="name">{props.course.name}</h3>
				<p>{props.course.trainer}</p>
				<p className="schedule">{props.course.schedule}</p>	
			</div>

			<div className="container2">
				<button className="btn" id={props.course.id}><a>Delete</a></button>	
			</div>	

		</div>	
	)
}

class App extends React.Component {

	state = {
		courses: [
			{id: '1', name: 'Swimming', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'},	
			{id: '2', name: 'Functional training', trainer:'Eduard Shaimardanov', schedule:'Пн., Вт., Ср. в 17:00'},	
			{id: '3', name: 'Stretching', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'},
			
		]	
	}

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


ReactDOM.render(<App />, document.getElementById('root'))






