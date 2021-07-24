import Head from 'next/head'
import Image from 'next/image'
import React, { Component } from 'react'
import CanvasDraw from "react-canvas-draw"
import { CompactPicker ,ColorResult } from 'react-color'
import canvasStyle from "../styles/canvas/Canvas.module.css"
import io from 'socket.io-client'

export default class index extends Component {

	// variable declaration
	canvas: CanvasDraw | null = null;
	canvasData: any = "";
	deviceWidth = 1024;
	deviceHeight = 600;
	state = {
		color: "#000000",
		width: this.deviceWidth / 2,
		height: this.deviceHeight / 2,
		brushRadius: 1,
		lazyRadius: 0
	}
	endPoint = "http://127.0.0.1:5000/"
	socket = io(this.endPoint)
	
	// private functions
	save = () => {
		this.canvasData = this.canvas?.getSaveData();
		this.socket.emit("update-canvas", {roomId: 1, canvasData: this.canvasData});
	}
	handleColorChange = (color: ColorResult) => {
		this.setState({color: color.hex});
	}

	// socket.io functions
	componentDidMount() {
		this.socket.on("connect", () => {
			console.log("connected")
		})
		this.socket.on("update-canvas", data => {
			console.log(data)
		})
	}

	render() {
		return (
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
		)
	}
}
