import React from 'react';
import { astar } from '../../algorithims/astar';
import { dijkstras } from '../../algorithims/dijkstras';
import Node from '../Node/Node';
import './Grid.css';

export default class Grid extends React.Component {
	constructor(props, ref) {
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
			hasRun: false,
		};
	}

	componentDidMount() {
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

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.resetBoard !== prevProps.resetBoard &&
			this.props.resetBoard === true
		) {
			const grid = this.resetBoard(this.state.grid);
			this.setState({ grid });
			this.setState({ hasRun: this.props.runVisualization });
		}
		if (
			this.props.runVisualization !== prevProps.runVisualization &&
			this.props.runVisualization === true
		) {
			this.runAlgorithm(this.props.selectedAlgorithm);
			this.setState({ hasRun: true });
		}
		if (
			this.props.clearWalls !== prevProps.clearWalls &&
			this.props.clearWalls === true
		) {
			this.clearWalls(this.state.grid);
			this.props.clearWallsResetState();
		}
		if (
			this.props.clearWeights !== prevProps.clearWeights &&
			this.props.clearWeights === true
		) {
			this.clearWeights(this.state.grid);
			this.props.clearWeightsResetState();
		}
	}

	resetBoard(grid) {
		const newGrid = grid.slice();
		for (let row = 0; row < grid.length; row++) {
			for (let column = 0; column < grid[row].length; column++) {
				if (
					row === this.state.startNodeRow &&
					column === this.state.startNodeColumn
				) {
					this[`node-${row}-${column}`].className = 'node node_start';
				} else if (
					row === this.state.finishNodeRow &&
					column === this.state.finishNodeColumn
				) {
					this[`node-${row}-${column}`].className = 'node node_finish';
				} else {
					this[`node-${row}-${column}`].className = 'node node_default';
				}
			}
		}
		return newGrid;
	}

	clearWalls = (grid) => {
		for (let row = 0; row < grid.length; row++) {
			for (let column = 0; column < grid[row].length; column++) {
				const newGrid = this.updateNode(grid, row, column, { isWall: false });
				this.setState({ grid: newGrid });
			}
		}
	};

	clearWeights = (grid) => {
		for (let row = 0; row < grid.length; row++) {
			for (let column = 0; column < grid[row].length; column++) {
				const newGrid = this.updateNode(grid, row, column, { weight: 1 });
				this.setState({ grid: newGrid });
			}
		}
	};

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

	handleMouseDown(row, column) {
		const newGrid = this.updateNode(this.state.grid, row, column, ['isWall']);
		this.setState({ grid: newGrid, mousePressed: true });
	}

	handleMouseEnter(row, column) {
		if (!this.state.mousePressed) return;
		const newGrid = this.updateNode(this.state.grid, row, column, ['isWall']);
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
				<div className='grid'>
					{grid.map((row, idxRow) => {
						return (
							<div className='row' key={idxRow}>
								{row.map((node, idxNode) => {
									const {
										isStart,
										isFinish,
										isCurrent,
										isShortest,
										isVisited,
										row,
										column,
										isWall,
										weight,
									} = node;
									return (
										<Node
											key={idxNode}
											setRef={this.setRef}
											row={row}
											weight={weight}
											column={column}
											isWall={isWall}
											isStart={isStart}
											isFinish={isFinish}
											isCurrent={isCurrent}
											isShortest={isShortest}
											isVisited={isVisited}
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

	runAlgorithm(algorithmName) {
		const {
			grid,
			startNodeRow,
			startNodeColumn,
			finishNodeRow,
			finishNodeColumn,
		} = this.state;
		const startNode = grid[startNodeRow][startNodeColumn];
		const finishNode = grid[finishNodeRow][finishNodeColumn];
		let visitedInOrder;
		let shortestInOrder;

		switch (algorithmName) {
			case 'dijkstras':
				visitedInOrder = dijkstras.run(grid, startNode, finishNode);
				shortestInOrder = dijkstras.getShortestPath(finishNode);
				break;
			case 'astar':
				visitedInOrder = astar.run(grid, startNode, finishNode);
				shortestInOrder = astar.getShortestPath(finishNode);
				break;
			default:
				return;
		}
		this.animate(visitedInOrder, shortestInOrder);
	}

	animate(visitedNodesInOrder, nodesInShortestOrder) {
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			const node = visitedNodesInOrder[i];
			if (i === visitedNodesInOrder.length) {
				setTimeout(() => {
					this.animateShortestPath(nodesInShortestOrder);
				}, 10 * i);
				return;
			}
			setTimeout(() => {
				// let newGrid = this.updateNode(this.state.grid, node.row, node.column, {isCurrent: true});
				// this.setState({grid: newGrid});
				// console.log([`node-${node.row}-${node.column}`].className)
				this[`node-${node.row}-${node.column}`].className = 'node node_current';
			}, 10 * i);

			setTimeout(() => {
				// let newGrid = this.updateNode(this.state.grid, node.row, node.column, { isCurrent: false, isVisited: true });
				// this.setState({ grid: newGrid });
				this[`node-${node.row}-${node.column}`].className = 'node node_visited';
			}, 10 * i + 10);
		}
	}

	animateShortestPath(nodesInShortestOrder) {
		for (let i = 0; i < nodesInShortestOrder.length; i++) {
			setTimeout(() => {
				const node = nodesInShortestOrder[i];
				// let newGrid = this.updateNode(this.state.grid, node.row, node.column, { isCurrent: false, isVisited: false, isShortest: true });
				// this.setState({ grid: newGrid });
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
			isCurrent: false,
			isShortest: false,
			weight: 1,
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

	updateNode(grid, row, column, properties = {}) {
		const newGrid = grid.slice();
		const node = newGrid[row][column];
		if (Array.isArray(properties)) {
			for (const property of properties) {
				node[property] = !node[property];
			}
		} else if (typeof properties === 'string') return;
		else if (typeof properties === 'boolean') return;
		else if (typeof properties === 'undefined') return;
		else if (typeof properties === 'function') return;
		else {
			for (const property in properties) {
				if (!property) return;
				node[property] = properties[property];
			}
		}
		return newGrid;
	}
}
