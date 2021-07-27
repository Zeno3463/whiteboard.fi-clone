import React, { Component } from 'react'
import CanvasDraw from "react-canvas-draw"
import { CompactPicker ,ColorResult } from 'react-color'
import canvasStyle from "../styles/canvas/Canvas.module.css"
import io from 'socket.io-client'

export default class Room extends Component<{roomId: string, isTeacher: boolean, userName: string}> {
	
	////// VARIABLE DECLARATION //////
	canvas: CanvasDraw | null = null;
	canvasData: any = "";
	deviceWidth = 1024;
	deviceHeight = 600;
	state: {[key: string]:any} = {
		color: "#000000",
		width: this.deviceWidth / 1.5,
		height: this.deviceHeight / 1.5,
		brushRadius: 1,
		lazyRadius: 0,
		studentWhiteboards: []
	}
	endPoint = "https://whiteboardfi-clone.zeno3463.repl.co"
	socket = io(this.endPoint)
	teacherCanvas: CanvasDraw | null = null;
	teacherCanvasData: any = "";
	studentWhiteboards: Array<any> = [];

	////// CONSTRUCTOR //////
	constructor (props: any) {
		super(props);
		
		// join room on load
		this.socket.emit("join-room", {roomId: this.props.roomId, isTeacher: this.props.isTeacher, userName: this.props.userName});
	}
	
	////// PRIVATE FUNCTIONS //////
	
	// called when the user drew something on the canvas
	save = () => {
		this.canvasData = this.canvas?.getSaveData();
		
		// if the user is a teacher, update all the teacher's whiteboards on all the student's pages
		if (this.props.isTeacher) this.socket.emit("update-teacher-canvas", {roomId: this.props.roomId, canvasData: this.canvasData, userName: this.props.userName});
		
		// if the user is a student, update the student's whiteboard on the teacher's page
		else this.socket.emit("update-student-canvas", {roomId: this.props.roomId, canvasData: this.canvasData, userName: this.props.userName});
	}
	
	handleColorChange = (color: ColorResult) => {
		this.setState({color: color.hex});
	}

	////// SOCKET.IO FUNCTIONS //////
	componentDidMount() {
		this.socket.on("update-teacher-canvas", data => {
			this.teacherCanvasData = data.canvasData
			this.teacherCanvas?.loadSaveData(this.teacherCanvasData, true)
		})

		this.socket.on("update-student-canvas", data => {
			if (this.props.isTeacher)
				for (var e of this.studentWhiteboards)
					if (e.userName === data.userName) {
						e.canvas.loadSaveData(data.canvasData, true)
						break;
					}
		})

		this.socket.on("join-room", data => {
			var stuWhiteboard = this.state.studentWhiteboards;
			for (var e of this.studentWhiteboards) if (e.userName === data.userName) return;
			
			// add a blank student's whiteboard to the teacher's page	
			this.studentWhiteboards.push({
				userName: data.userName,
				height: this.deviceHeight / 4,
				width: this.deviceWidth / 4,
				canvas: null,
			})

			stuWhiteboard.push(null);
			this.setState({studentWhiteboards: stuWhiteboard});
		})
	}

	render() {
		return (
			<div>
				<div className={canvasStyle.canvasContainer}>
					{!this.props.isTeacher ?
					<CanvasDraw 
					ref={canvas => (this.teacherCanvas = canvas)}
					disabled 
					hideGrid 
					canvasWidth={this.state.width}
					canvasHeight={this.state.height}
					/> : null}
				</div>
				<div className={canvasStyle.canvasContainer}>
					<div className={canvasStyle.canvasSettings}>						
						<button onClick={() => this.canvas?.clear()}>clear</button>
						<button onClick={() => this.canvas?.undo()}>undo</button>
						<CompactPicker onChangeComplete={this.handleColorChange} />
						<div>
							<span>brush radius: </span>
							<input type="number" min="1" onChange={e => this.setState({brushRadius: e.target.value})} />
						</div>
					</div>
					<div className={canvasStyle.canvas}>
						<CanvasDraw 
						ref={canvas => (this.canvas = canvas)}
						canvasWidth={this.state.width}
						canvasHeight={this.state.height}
						brushRadius={this.state.brushRadius}
						lazyRadius={this.state.lazyRadius} 
						brushColor={this.state.color}
						onChange={this.save} 
						/>
					</div>
				</div>
				<div className={canvasStyle.canvasContainer}>
					{
					this.props.isTeacher ?
					this.state.studentWhiteboards.map((e: any, i: number) =>
					<div>
						{this.studentWhiteboards[i].userName}
						<CanvasDraw
						ref={canvas => (this.studentWhiteboards[i].canvas = canvas)}
						canvasWidth={this.studentWhiteboards[i].width}
						canvasHeight={this.studentWhiteboards[i].height}
						disabled
						hideGrid
						/> 
					</div>): null
					}
				</div>
			</div>
		)
	}
}