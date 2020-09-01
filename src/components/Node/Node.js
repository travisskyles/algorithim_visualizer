import React from 'react';
import './Node.css';

export default class Node extends React.Component {
	constructor(props) {
		super(props);
		this.State = {};
	}

	render() {
		const { isStart, isFinish } = this.props;
		const addedClass = isFinish
			? 'node_finish'
			: isStart
			? 'node_start'
			: 'node_default';

		return <div className={`node ${addedClass}`}></div>;
		// return <div className={`node`}></div>;
	}
}
