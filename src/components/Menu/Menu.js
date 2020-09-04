import React from 'react';
import './Menu.css';

export default function Menu(props) {
	const { selectedAlgorithm } = props;
	const goButtonText = selectedAlgorithm
		? `Visualize ${selectedAlgorithm}!`
    : 'Visualize!';


	return (
		<div className='menu'>
			<ul>
				<li
					id='run-button'
					value='menu-run'
					onClick={(e) => props.handleMenuClick(e)}>
					{goButtonText}
				</li>
				<li
          className='menu-button'
          value='algorithm-null' 
          onClick={(e) => props.handleMenuClick(e)}>
					Algorithms
				</li>
				<li
          className='menu-button'
          value='menu-resetBoard' 
          onClick={(e) => props.handleMenuClick(e)}>
					Reset Board
				</li>
				<li
          className='menu-button'
          value='menu-clearWalls' 
          onClick={(e) => props.handleMenuClick(e)}>
					Clear Walls
				</li>
				<li
          className='menu-button'
          value='menu-clearWeights' 
          onClick={(e) => props.handleMenuClick(e)}>
					Clear Weights
				</li>
			</ul>
		</div>
	);
}