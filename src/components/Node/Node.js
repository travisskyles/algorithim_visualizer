import React from 'react';
import './Node.css';

export default function Node(props) {
	const {
		isStart,
		isFinish,
		isCurrent,
		isShortest,
		isVisited,
		row,
		column,
		isWall,
		onMouseDown,
		onMouseEnter,
		onMouseLeave,
		onMouseUp,
		onClick,
		setRef,
		weight,
	} = props;

	const addedClass = isFinish
		? 'node_finish'
		: isStart
		? 'node_start'
		: isWall
		? 'node_wall'
		: isCurrent
		? 'node_current'
		: isVisited
		? 'node_visited'
		: isShortest
		? 'node_shortestPath'
		: 'node_default';

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		return false;
	};

	const displayWeight = weight > 1 ? weight : '';
	return (
		<div
			id={`node-${row}-${column}`}
			tabIndex={0}
			ref={(refElem) => setRef(`node-${row}-${column}`, refElem)}
			className={`node ${addedClass}`}
			draggable={false}
			onClick={() => onClick(row, column)}
			onDrag={(e) => handleDrag(e)}
			onDragStart={(e) => handleDrag(e)}
			onMouseDown={() => onMouseDown(row, column)}
			onMouseUp={() => onMouseUp(row, column)}
			onMouseEnter={() => onMouseEnter(row, column)}
			onMouseLeave={() => onMouseLeave(row, column)}>
			{displayWeight}
		</div>
	);
}
