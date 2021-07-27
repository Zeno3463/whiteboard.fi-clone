import React, { Component } from 'react'
import Form from "../components/form"
import style from "../styles/front-page/FrontPage.module.css"

export default class index extends Component {
	
	/// VARIABLE DECLARATION ///
	state = {
		form: null,
	}
	
	render() {
		return (
			<div className={style.container}>
				<nav className={style.nav}>
					<div>
						<h1>WHITEBOARD.fi CLONE</h1>
						<ul>
							<li>HOME</li>
							<li>FEATURES</li>
							<li>PRICING</li>
							<li>FAQ</li>
							<li>ABOUT</li>
							<li>NEWS</li>
							<li>BLOG</li>
						</ul>
					</div>
					<div>
						<button onClick={() => this.setState({form: <Form isTeacher={true} />})}>NEW</button>
						<button onClick={() => this.setState({form: <Form isTeacher={false} />})}>JOIN</button>
					</div>
				</nav>
				<div className={style.main}>
					<h1>WHITEBOARD.fi CLONE</h1>
					<button onClick={() => this.setState({form: <Form isTeacher={true} />})}>NEW CLASS</button>
					<button onClick={() => this.setState({form: <Form isTeacher={false} />})}>JOIN CLASS</button>
				</div>
				{this.state.form}
			</div>
		)
	}
}
