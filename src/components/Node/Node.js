import React from 'react';
import './Node.css';

export default function Node(props) {
	const {
		isStart,
    isFinish,
		row,
		column,
		isWall,
		onMouseDown,
		onMouseEnter,
		onMouseUp,
		onDragStart,
		setRef,
  } = props;

	const addedClass = isFinish
		? 'node_finish'
		: isStart
		? 'node_start'
		: isWall
    ? 'node_wall'
		: 'node_default';
	return (
		<div
			id={`node-${row}-${column}`}
			ref={(refElem) => setRef(`node-${row}-${column}`, refElem)}
			className={`node ${addedClass}`}
			draggable={false}
			onDragStart={() => onDragStart()}
			onMouseDown={() => onMouseDown(row, column)}
			onMouseEnter={() => onMouseEnter(row, column)}
			onMouseUp={() => onMouseUp()}></div>
	);
}
