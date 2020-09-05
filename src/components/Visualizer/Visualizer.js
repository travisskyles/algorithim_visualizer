import React from 'react';
import Grid from '../Grid/Grid';
import Header from '../Header/Header';
import InfoContainer from '../InfoContainer/InfoContainer';
import './Visualizer.css';

export default class Visualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedAlgorithm: '',
			menuSelected: '',
			runVisualization: false,
      resetBoard: false,
      message: '',
		};
  }

	setStateAsync(state) {
		return new Promise((resolve) => {
			this.setState(state, resolve);
		});
	}

	handleMenuClick = (e) => {
		let [type, name] = e.target.getAttribute('value').split('-');
		switch (type) {
			case 'menu':
				this.setState({ menuSelected: name });
				if (name === 'run') {
					if (!this.state.selectedAlgorithm) {
            this.setState({message: 'No Selection, please choose an algorithm to run.'})
						return;
					} else {
            this.setState({ runVisualization: true });
            this.setState({ message: `${this.state.selectedAlgorithm} selected. Click Visualize to run!` });
          }
				}
				if (name === 'resetBoard') {
          this.setState({ resetBoard: true });
          this.setState({ runVisualization: false });
          this.setState({ message: 'Board Reset!' });
				}
				break;
			case 'algorithm':
				this.setState({ selectedAlgorithm: name });
				break;
			default:
				return;
    }
	};

	render() {
		return (
			<>
        <Header
          selectedAlgorithm={this.state.selectedAlgorithm}
          handleMenuClick={(e) => this.handleMenuClick(e)}
        />
        <InfoContainer 
          selectedAlgorithm={this.state.selectedAlgorithm}
          message={this.state.message}
        />
				<Grid
					runVisualization={this.state.runVisualization}
					selectedAlgorithm={this.state.selectedAlgorithm}
					resetBoard={this.state.resetBoard}
				/>
			</>
		);
	}
}
