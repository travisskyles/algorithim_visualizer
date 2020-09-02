import React from 'react';
import './Node.css';

export default function Node(props) {
	const { isStart, isFinish, row, column, isWall } = props;
	const addedClass = isFinish
		? 'node_finish'
		: isStart
		? 'node_start'
		: 'node_default';

	return (
		<div id={`node-${row}-${column}`} className={`node ${addedClass}`}></div>
	);
}
