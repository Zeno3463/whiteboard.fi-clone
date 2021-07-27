import React, { Component } from 'react'
import { v4 } from "uuid";
import style from "../styles/form/Form.module.css"
import Link from "next/link"

export default class Form extends Component<{isTeacher: boolean}> {
	
	////// VARIABLE DECLARATION //////
	state = {
		id: v4(),
		name: "",
	}

	render() {
		return (
			<div className={style.container}>
				{this.props.isTeacher ? 
				<h1>Create New Class</h1> :
				<h1>Join Class</h1>
				}
				{this.props.isTeacher ? null : 
				<div>
					Enter room code:
					<input type="text" onChange={e => this.setState({id: e.target.value})} />
				</div>}
				Your name: <input type="text" onChange={e => this.setState({name: e.target.value})} />
				<Link href={`/${this.state.id}+${this.props.isTeacher ? 1 : 0}+${this.state.name}`}>Join Room</Link>
				{this.props.isTeacher ? this.state.id : null}
			</div>
		)
	}
}