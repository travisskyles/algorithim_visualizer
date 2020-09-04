import React from 'react';
import Grid from '../Grid/Grid';
import Menu from '../Menu/Menu';
import './Visualizer.css';

export default class Visualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      selectedAlgoName: '',
    };
	}

	render() {
		return (
			<>
				<div className='header'>
          <h1 id='title'>Algorithm Visualizer</h1>
          <Menu 
            AlgoName={this.props.selectedAlgoName}
          />
        </div>
				<div className='info-container'></div>
				<Grid />
			</>
		);
	}
}
