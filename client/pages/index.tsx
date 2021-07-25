import React, { Component } from 'react'
import Room from "../components/room"
import io from 'socket.io-client'

export default class index extends Component {
	
	// variable declaration
	state = {
		id: "",
		room: null
	}
	endPoint = "http://127.0.0.1:5000/"
	socket = io(this.endPoint)
	
	// private functions
	joinRoom = () => {
		this.setState({room: <Room id={this.state.id} />});
		this.socket.emit("join-room", {channel: this.state.id})
	}

	render() {
		return (
			<div>
				<input type="text" onChange={e => this.setState({id: e.target.value})} />
				<button onClick={this.joinRoom} >join room</button>
				{this.state.room}
			</div>
		)
	}
}
