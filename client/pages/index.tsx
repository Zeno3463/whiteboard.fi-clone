import Head from 'next/head'
import Image from 'next/image'
import React, { Component } from 'react'
import CanvasDraw from "react-canvas-draw"
import { CompactPicker ,ColorResult } from 'react-color'
import canvasStyle from "../styles/canvas/Canvas.module.css"

export default class index extends Component {

	// variable declaration
	state = {
		color: "#000000",
		width: 400,
		height: 400,
		brushRadius: 10,
		lazyRadius: 12
	}
	canvas: CanvasDraw | null = null;
	canvasData: any = "";

	// private function
	save = () => {
		this.canvasData = this.canvas?.getSaveData();
	}
	handleColorChange = (color: ColorResult) => {
		this.setState({color: color.hex})
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
