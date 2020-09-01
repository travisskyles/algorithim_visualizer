import React from 'react';
import Node from '../Node/Node';
import './Graph.css';

export default class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: [],
		};
	}

	componentDidMount() {
		const grid = createGrid();
		this.setState({ grid });
	}

	render() {
		const { grid } = this.state;
		return (
			<div className='grid'>
				{grid.map((row, idxRow) => {
					return (
						<div className='row' key={idxRow}>
							{row.map((node, idxNode) => {
								const { isStart, isFinish } = node;
								return (
									<Node
										key={idxNode}
										isStart={isStart}
										isFinish={isFinish}></Node>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}
}

const createGrid = () => {
	const grid = [];
	for (let row = 0; row < 30; row++) {
		const currentRow = [];
		for (let column = 0; column < 65; column++) {
			const currentNode = {
				column,
				row,
				isStart: row === 15 && column === 5,
        isFinish: row === 15 && column === 60,
        distance: Infinity,
			};
			currentRow.push(currentNode);
		}
		grid.push(currentRow);
	}
	return grid;
};
