import React from 'react';
import './Menu.css';

export default function Menu(props){
  const {algoName} = props;

  return (
		<div className='menu'>
			<ul>
				<li>Visualize {algoName}</li>
				<li>Algorithms</li>
				<li>Reset Board</li>
				<li>Clear Walls</li>
				<li>Clear Weights</li>
			</ul>
		</div>
	);
}