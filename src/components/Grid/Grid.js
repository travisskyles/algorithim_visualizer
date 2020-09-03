import React from 'react';
import {
	dijkstras,
	getNodesInShortestOrder,
} from '../../algorithims/dijkstras';
import Node from '../Node/Node';
import './Grid.css';

export default class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: [],
			windowHeight: 0,
			windowWidth: 0,
			rows: 25,
			columns: 60,
			startNodeRow: 12,
			startNodeColumn: 10,
			finishNodeRow: 12,
			finishNodeColumn: 50,
			mousePressed: false,
		};
	}

	componentDidMount() {
		// console.log('start', this.state.windowWidth);
		window.addEventListener('resize', this.updateColumns);
		window.addEventListener('load', () => {
			this.updateWindow();
			this.updateRows();
			this.updateColumns();
			const grid = this.createGrid();
			this.setState({ grid });
		});
		window.addEventListener('resize', () => {
			this.updateWindow();
			this.updateRows();
			this.updateColumns();
			const grid = this.createGrid();
			this.setState({ grid });
		});
	}

	setRef = (key, ref) => {
		this[key] = ref;
	};

	updateWindow = () => {
		this.setState({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
		});
	};

	updateColumns = () => {
		let x = this.state.windowWidth;
		if (x > 0 && x < 600) {
			this.setState({ columns: 20 });
		}
		if (x > 600 && x < 1200) {
			this.setState({ columns: 40 });
		}
		if (x > 1200) {
			this.setState({ columns: 60 });
		}
	};

	updateRows = () => {
		let x = this.state.windowWidth;
		if (x > 0 && x < 600) {
			this.setState({ rows: 15 });
		}
		if (x > 600 && x < 1000) {
			this.setState({ rows: 20 });
		}
		if (x > 1000) {
			this.setState({ rows: 25 });
		}
	};

	handleClick = () => {
		this.runDijkstras();
	};

	handleMouseDown(row, column) {
		const newGrid = this.updateGrid(this.state.grid, row, column);
		this.setState({ grid: newGrid, mousePressed: true });
	}

	handleMouseEnter(row, column) {
		if (!this.state.mousePressed) return;
		const newGrid = this.updateGrid(this.state.grid, row, column);
		this.setState({ grid: newGrid });
	}

	handleMouseUp() {
		this.setState({ mousePressed: false });
	}

	handleDragStart() {
		this.setState({ mousePressed: false });
		return false;
	}

	render() {
		const { grid } = this.state;
		return (
			<div className='grid_wrapper'>
				<button onClick={this.handleClick}>Dijkstras</button>
				<div className='grid'>
					{grid.map((row, idxRow) => {
						return (
							<div className='row' key={idxRow}>
								{row.map((node, idxNode) => {
									const { isStart, isFinish, row, column, isWall } = node;
									return (
										<Node
											key={idxNode}
											setRef={this.setRef}
											row={row}
											column={column}
											isWall={isWall}
											isStart={isStart}
											isFinish={isFinish}
											onDragStart={() => this.handleDragStart()}
											onMouseDown={(row, col) => this.handleMouseDown(row, col)}
											onMouseEnter={(row, col) =>
												this.handleMouseEnter(row, col)
											}
											onMouseUp={() => this.handleMouseUp()}></Node>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	runDijkstras() {
		const {
			grid,
			startNodeRow,
			startNodeColumn,
			finishNodeRow,
			finishNodeColumn,
		} = this.state;
		const startNode = grid[startNodeRow][startNodeColumn];
		const finishNode = grid[finishNodeRow][finishNodeColumn];
		const visitedInOrder = dijkstras(grid, startNode, finishNode);
		const shortestInOrder = getNodesInShortestOrder(finishNode);
		this.animateDijkstra(visitedInOrder, shortestInOrder);
	}

	animateDijkstra(visitedNodesInOrder, nodesInShortestOrder) {
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length) {
				setTimeout(() => {
					this.animateShortestPath(nodesInShortestOrder);
				}, 10 * i);
				return;
			}
			setTimeout(() => {
				const node = visitedNodesInOrder[i];
				this[`node-${node.row}-${node.column}`].className = 'node node_visited';
			}, 10 * i);
		}
	}

	animateShortestPath(nodesInShortestOrder) {
		for (let i = 0; i < nodesInShortestOrder.length; i++) {
			setTimeout(() => {
				const node = nodesInShortestOrder[i];
				this[`node-${node.row}-${node.column}`].className =
					'node node_shortestPath';
			}, 50 * i);
		}
	}

	createNode(row, column) {
		return {
			column,
			row,
			isWall: false,
			isVisited: false,
			isStart:
				row === this.state.startNodeRow &&
				column === this.state.startNodeColumn,
			isFinish:
				row === this.state.finishNodeRow &&
				column === this.state.finishNodeColumn,
			distance: Infinity,
			previousNode: null,
		};
	}

	createGrid() {
		const { rows, columns } = this.state;
		const grid = [];
		for (let row = 0; row < rows; row++) {
			const currentRow = [];
			for (let column = 0; column < columns; column++) {
				const currentNode = this.createNode(row, column);
				currentRow.push(currentNode);
			}
			grid.push(currentRow);
		}
		return grid;
	}

	updateGrid(grid, row, column) {
		const newGrid = grid.slice();
		const node = newGrid[row][column];
		const newNode = {
			...node,
			isWall: !node.isWall,
		};
		newGrid[row][column] = newNode;
		return newGrid;
	}
}
