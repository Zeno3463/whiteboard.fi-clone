import Head from 'next/head'
import Image from 'next/image'
import React, { Component } from 'react'
import CanvasDraw from "react-canvas-draw"
import { CompactPicker ,ColorResult } from 'react-color'
import canvasStyle from "../styles/canvas/Canvas.module.css"
import io from 'socket.io-client'

export default class Room extends Component<{id: string, isTeacher: boolean}> {
	// variable declaration
	canvas: CanvasDraw | null = null;
	canvasData: any = "";
	deviceWidth = 1024;
	deviceHeight = 600;
	state: {[key: string]:any} = {
		color: "#000000",
		width: this.deviceWidth / 2,
		height: this.deviceHeight / 2,
		brushRadius: 1,
		lazyRadius: 0,
		studentWhiteboards: []
	}
	endPoint = "http://127.0.0.1:5000/"
	socket = io(this.endPoint)
	teacherCanvas: CanvasDraw | null = null;
	teacherCanvasData: any = "";
	studentWhiteboards: Array<any> = [];

	constructor (props: any) {
		super(props);
		this.socket.emit("join-room", {roomId: this.props.id, isTeacher: this.props.isTeacher});
	}
	
	// private functions
	save = () => {
		this.canvasData = this.canvas?.getSaveData();
		if (this.props.isTeacher) this.socket.emit("update-teacher-canvas", {roomId: 1, canvasData: this.canvasData});
		else this.socket.emit("update-student-canvas", {roomId: this.props.id, canvasData: this.canvasData});
	}
	handleColorChange = (color: ColorResult) => {
		this.setState({color: color.hex});
	}

	// socket.io functions
	componentDidMount() {
		this.socket.on("update-teacher-canvas", data => {
			if (!this.props.isTeacher){
				this.teacherCanvasData = data.canvasData
			}
			this.teacherCanvas?.loadSaveData(this.teacherCanvasData, true)
		})
		this.socket.on("update-student-canvas", data => {
			if (this.props.isTeacher){

			}
		})
		this.socket.on("join-room", data => {
			if (!data.isTeacher) {
				var stuWhiteboard = this.state.studentWhiteboards;
				this.studentWhiteboards.push({
					id: 1,
					height: this.deviceHeight / 4,
					width: this.deviceWidth / 4,
					canvas: null,
					canvasData: null
				})
				stuWhiteboard.push(null);
				this.setState({studentWhiteboards: stuWhiteboard});
			}
			console.log(this.studentWhiteboards)
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
					<CanvasDraw 
					ref={canvas => (this.canvas = canvas)}
					canvasWidth={this.state.width}
					canvasHeight={this.state.height}
					brushRadius={this.state.brushRadius}
					lazyRadius={this.state.lazyRadius} 
					brushColor={this.state.color}
					onChange={this.save} 
					/>
					<button onClick={() => this.canvas?.clear()}>clear</button>
					<button onClick={() => this.canvas?.undo()}>undo</button>
					<CompactPicker onChangeComplete={this.handleColorChange} />
					<div>
						<span>brush radius: </span>
						<input type="number" min="1" onChange={e => this.setState({brushRadius: e.target.value})} />
					</div>
				</div>
				<div className={canvasStyle.canvasContainer}>
					{this.state.studentWhiteboards.map((e: any, i: number) =>
					<CanvasDraw
					ref={canvas => (this.studentWhiteboards[i].canvas = canvas)}
					canvasWidth={this.studentWhiteboards[i].width}
					canvasHeight={this.studentWhiteboards[i].height}
					disabled
					hideGrid
					/>
					)}
				</div>
			</div>
		)
	}
}