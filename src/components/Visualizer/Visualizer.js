import React from 'react';
import Grid from '../Grid/Grid';
import './Visualizer.css';

export default class Visualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<>
				<div className='header'></div>
				<div className='info-container'></div>
				<Grid />
			</>
		);
	}
}
