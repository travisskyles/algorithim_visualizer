import React from 'react';
import Grid from '../Grid/Grid';
import Menu from '../Menu/Menu';
import './Visualizer.css';

export default class Visualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      selectedAlgorithm: '',
      menuSelected: '',
    };
  }
  
  handleMenuClick = (e) => {
    let [type, name] = e.target.getAttribute('value').split('-');
    console.log(type, name)
    switch(type){
      case 'menu':
        this.setState({menuSelected: name})
        break;
      case 'algorithm':
        this.setState({selectedAlgorithm: name})
        break;
      default:
          return
    }
  }

	render() {
		return (
			<>
				<div className='header'>
					<h1 id='title'>Algorithm Visualizer</h1>
					<Menu 
          selectedAlgorithm={this.state.selectedAlgorithm} handleMenuClick={(e) => this.handleMenuClick(e)} />
				</div>
				<div className='info-container'></div>
				<Grid
					menuSelected={this.state.menuSelected}
					selectedAlgoritim={this.state.selectedAlgorithm}
				/>
			</>
		);
	}
}
