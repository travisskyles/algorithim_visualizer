import React from 'react';
import Grid from '../Grid/Grid';
import './Visualizer.css';

export default class Visualizer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='body'>
				<Grid />
			</div>
		);
	}
}
