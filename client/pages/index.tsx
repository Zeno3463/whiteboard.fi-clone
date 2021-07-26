import React, { Component } from 'react'
import Room from "../components/room"
import { v4 } from "uuid";

export default class index extends Component {
	
	// variable declaration
	state = {
		id: v4(),
		name: "",
		room: null,
		isTeacher: false
	}
	
	// private functions
	joinRoom = () => {
		this.setState({room: <Room roomId={this.state.id} isTeacher={this.state.isTeacher} userName={this.state.name} />});
	}

	render() {
		return (
			<div>
				id: <input type="text" onChange={e => this.setState({id: e.target.value})} />
				name: <input type="text" onChange={e => this.setState({name: e.target.value})} />
				<button onClick={this.joinRoom} >join room</button>
				Is Teacher: <button onClick={() => this.setState({isTeacher: !this.state.isTeacher})}>{this.state.isTeacher.toString()}</button>
				{this.state.id}
				{this.state.room}
			</div>
		)
	}
}
