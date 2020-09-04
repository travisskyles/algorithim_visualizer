import React from 'react';
import './Menu.css';

export default function Menu(props){
  const {algoName} = props;

  return (
		<div className='menu'>
			<ul>
				{algoName ? (
					<li id='run-button'>Visualize {algoName}!</li>
				) : (
					<li id='run-button'>Visualize!</li>
				)}
				<li>Algorithms</li>
				<li>Reset Board</li>
				<li>Clear Walls</li>
				<li>Clear Weights</li>
			</ul>
		</div>
	);
}