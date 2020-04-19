function Course(props){
	return (
		<div className="card">
			<div className="container1">
				<h3>{props.course.name}</h3>
				<p>{props.course.trainer}</p>
				<p>{props.course.schedule}</p>	
			</div>

			<div className="container2">
				<button className="btn" id={props.course.id}><a>Choose</a></button>	
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
			{id: '4', name: 'Stretching', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'},
			{id: '5', name: 'Stretching', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'},
			{id: '6', name: 'Swimming2', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'},
			{id: '7', name: 'Swimming3', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'},
			{id: '8', name: 'Swimming4', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'},
			{id: '9', name: 'Swimming5', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'},
			{id: '10', name: 'Swimming6', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'},
			{id: '11', name: 'Swimming7', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'},
			{id: '12', name: 'Swimming8', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'},
			{id: '13', name: 'Swimming9', trainer:'Pavlova Alina', schedule:'Пн., Вт., Ср. в 17:00'}
		]	
	}

	render(){
		return (
			<div className="app">
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






