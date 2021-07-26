import React, { Component } from 'react'
import Room from "../components/room"
import io from 'socket.io-client'

export default class index extends Component {
	
	// variable declaration
	state = {
		id: "",
		room: null,
		isTeacher: false
	}
	endPoint = "http://127.0.0.1:5000/"
	socket = io(this.endPoint)
	
	// private functions
	joinRoom = () => {
		this.setState({room: <Room id={this.state.id} isTeacher={this.state.isTeacher} />});
	}

	render() {
		return (
			<div>
				<input type="text" onChange={e => this.setState({id: e.target.value})} />
				<button onClick={this.joinRoom} >join room</button>
				Is Teacher: <button onClick={() => this.setState({isTeacher: !this.state.isTeacher})}>{this.state.isTeacher.toString()}</button>
				{this.state.room}
			</div>
		)
	}
}
