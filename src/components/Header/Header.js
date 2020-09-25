import React, { useRef } from 'react';
import './Header.css';

export default function Header(props) {
	const algorithmButtonRef = useRef();
	const mazeButtonRef = useRef();
	const dropdownSearchRef = useRef();
	const dropdownMazeRef = useRef();

	const algoTextStore = {
		astar: 'Visualize A*!',
		dijkstras: 'Visualize Dijkstras!',
		breadthFirst: 'Visualize Breadth First!',
		btree: 'Visualize Binary Tree!',
		depthFirst: 'Visualize Depth First!',
	};

	const { selectedAlgorithm } = props;
	const goButtonText = (selectedAlgorithm) => {
		if (algoTextStore[selectedAlgorithm]) {
			return algoTextStore[selectedAlgorithm];
		} else {
			return 'Visualize!';
		}
		// let text;
		// switch (selectedAlgorithm) {
		// 	case 'astar':
		// 		text = 'Visualize A*!';
		// 		break;
		// 	case 'dijkstras':
		// 		text = 'Visualize Dijkstras!';
		// 		break;
		// 	case 'btree':
		// 		text = 'Visualize Binary Tree!';
		// 		break;
		// 	default:
		// 		text = 'Visualize!';
		// 		break;
		// }
		// return text;
	};

	const handleMenuEnter = (menuButtonRef, dropDownRef) => {
		addRemoveClass(menuButtonRef, 'add', 'menu-hover-hold');
		addRemoveClass(dropDownRef, 'remove', 'hidden');
	};

	const handleMenuLeave = (menuButtonRef, dropDownRef) => {
		addRemoveClass(menuButtonRef, 'remove', 'menu-hover-hold');
		addRemoveClass(dropDownRef, 'add', 'hidden');
	};

	const handleDropDownEnter = (menuButtonRef, dropDownRef) => {
		addRemoveClass(menuButtonRef, 'add', 'menu-hover-hold');
		addRemoveClass(dropDownRef, 'remove', 'hidden');
	};

	const handleDropDownLeave = (menuButtonRef, dropDownRef) => {
		addRemoveClass(menuButtonRef, 'remove', 'menu-hover-hold');
		addRemoveClass(dropDownRef, 'add', 'hidden');
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
					ref={mazeButtonRef}
					onMouseEnter={() => handleMenuEnter(mazeButtonRef, dropdownMazeRef)}
					onMouseLeave={() => handleMenuLeave(mazeButtonRef, dropdownMazeRef)}>
					Maze Algorithms
				</li>
				<div
					id='dropdown-maze'
					className='dropdown hidden'
					ref={dropdownMazeRef}
					onMouseEnter={() =>
						handleDropDownEnter(mazeButtonRef, dropdownMazeRef)
					}
					onMouseLeave={() =>
						handleDropDownLeave(mazeButtonRef, dropdownMazeRef)
					}>
					<ul>
						<li
							value='algorithm-btree'
							onClick={(e) => props.handleMenuClick(e)}>
							Binary Tree
						</li>
						<li
							value='algorithm-depthFirst'
							onClick={(e) => props.handleMenuClick(e)}>
							Depth First
						</li>
					</ul>
				</div>
				<li
					className='menu-button'
					ref={algorithmButtonRef}
					onMouseEnter={() =>
						handleMenuEnter(algorithmButtonRef, dropdownSearchRef)
					}
					onMouseLeave={() =>
						handleMenuLeave(algorithmButtonRef, dropdownSearchRef)
					}>
					Search Algorithms
				</li>
				<div
					id='dropdown-search'
					className='dropdown hidden'
					ref={dropdownSearchRef}
					onMouseEnter={() =>
						handleDropDownEnter(algorithmButtonRef, dropdownSearchRef)
					}
					onMouseLeave={() =>
						handleDropDownLeave(algorithmButtonRef, dropdownSearchRef)
					}>
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
						<li
							value='algorithm-breadthFirst'
							onClick={(e) => props.handleMenuClick(e)}>
							Breadth First
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
