import React from 'react'
import { SketchField, Tools } from 'react-sketch'

export default function App() {
	return (
		<div>
			<SketchField width='1024px' 
					height='768px' 
					tool={Tools.Pencil} 
					lineColor='black'
					lineWidth={3}/>
		</div>
	)
}
