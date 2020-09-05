import React, { useRef } from 'react';
import './Header.css';

export default function Header(props) {
	const algorithmButtonRef = useRef();
	const dropdownRef = useRef();

	const { selectedAlgorithm } = props;
	const goButtonText = (selectedAlgorithm) => {
		let text;
		switch (selectedAlgorithm) {
			case 'astar':
				text = 'Visualize A*!';
				break;
			case 'dijkstras':
				text = 'Visualize Dijkstras!';
				break;
			default:
				text = 'Visualize!';
				break;
		}
		return text;
	};

	const handleMenuEnter = () => {
		addRemoveClass(algorithmButtonRef, 'add', 'menu-hover-hold');
		addRemoveClass(dropdownRef, 'remove', 'hidden');
	};

	const handleMenuLeave = () => {
		addRemoveClass(algorithmButtonRef, 'remove', 'menu-hover-hold');
		addRemoveClass(dropdownRef, 'add', 'hidden');
	};

	const handleDropDownEnter = () => {
		addRemoveClass(algorithmButtonRef, 'add', 'menu-hover-hold');
		addRemoveClass(dropdownRef, 'remove', 'hidden');
	};

	const handleDropDownLeave = () => {
		addRemoveClass(algorithmButtonRef, 'remove', 'menu-hover-hold');
		addRemoveClass(dropdownRef, 'add', 'hidden');
	};

	const addRemoveClass = (ref, addOrRemove, className) => {
		let classes = ref.current.className.split(' ');
		if (classes[0] === '') {
			classes = [];
		}
		switch (addOrRemove) {
			case 'add':
				if (classes.includes(className)) return;
				else if (!classes.includes(className)) {
					classes.push(className);
					let newClasses =
						classes.length > 1 ? classes.join(' ') : classes.join('');
					ref.current.className = newClasses;
					return;
				}
				break;
			case 'remove':
				if (classes.includes(className)) {
					let newClasses = classes.filter((el) => el !== className);
					if (newClasses.length === 0) {
						newClasses = [];
					} else if (newClasses.length === 1) {
						newClasses.join('');
					} else if (newClasses.length > 1) {
						newClasses.join(' ');
					}
					ref.current.className = newClasses;
					return;
				} else if (!classes.includes(className)) return;
				break;
			default:
				break;
		}
	};

	return (
		<div className='header'>
			<h1 id='title'>Algorithm Visualizer</h1>
			<div
				id='run-button'
				value='menu-run'
				onClick={(e) => props.handleMenuClick(e)}>
				{goButtonText(selectedAlgorithm)}
			</div>
			<ul>
				<li
					className='menu-button'
					ref={algorithmButtonRef}
					onMouseEnter={() => handleMenuEnter()}
					onMouseLeave={() => handleMenuLeave()}>
					Algorithms
				</li>
				<div
					id='dropdown'
					className='hidden'
					ref={dropdownRef}
					onMouseEnter={() => handleDropDownEnter()}
					onMouseLeave={() => handleDropDownLeave()}>
					<ul>
						<li
							value='algorithm-dijkstras'
							onClick={(e) => props.handleMenuClick(e)}>
							Dijkstras
						</li>
						<li
							value='algorithm-astar'
							onClick={(e) => props.handleMenuClick(e)}>
							A* Search
						</li>
					</ul>
				</div>
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
