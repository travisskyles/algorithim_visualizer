import React from 'react';
import { IconContext } from 'react-icons';
import { astar } from '../../algorithims/astar';
import { breadthFirst } from '../../algorithims/breadthFirst';
import { dijkstras } from '../../algorithims/dijkstras';
import { binaryTreeMaze } from '../../algorithims/maze_gen/binaryTree';
import { depthFirstMaze } from '../../algorithims/maze_gen/depthFirst';
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
			columns: 61,
			initialStartNodeRow: 12,
			initialStartNodeColumn: 10,
			initialFinishNodeRow: 12,
			initialFinishNodeColumn: 50,
			startNodeRow: 12,
			startNodeColumn: 10,
			finishNodeRow: 12,
			finishNodeColumn: 50,
			mousePressed: false,
			startSelected: false,
			finishSelected: false,
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

	componentDidUpdate(prevProps) {
		// Check whether reset should activate and reset state
		if (
			this.props.resetBoard !== prevProps.resetBoard &&
			this.props.resetBoard === true
		) {
			const grid = this.resetBoard(this.state.grid);
			this.setState({
				grid: grid,
				startNodeRow: this.state.initialStartNodeRow,
				startNodeColumn: this.state.initialStartNodeColumn,
				finishNodeRow: this.state.initialFinishNodeRow,
				finishNodeColumn: this.state.finishNodeColumn,
				hasRun: false,
			});
			this.props.resetBoardResetState();
		}
		// check whether visualize should run
		if (
			this.props.runVisualization !== prevProps.runVisualization &&
			this.props.runVisualization === true
		) {
			this.runAlgorithm(this.props.selectedAlgorithm);
			this.setState({ hasRun: true });
			this.props.runVisualizationResetState();
		}
		// check whether wall should clear and reset state
		if (
			this.props.clearWalls !== prevProps.clearWalls &&
			this.props.clearWalls === true
		) {
			this.clearWalls(this.state.grid);
			this.props.clearWallsResetState();
		}
		// check whether weights should clear and reset state
		if (
			this.props.clearWeights !== prevProps.clearWeights &&
			this.props.clearWeights === true
		) {
			this.clearWeights(this.state.grid);
			this.props.clearWeightsResetState();
		}
	}

	resetBoard() {
		const { rows, columns } = this.state;
		const grid = [];
		for (let row = 0; row < rows; row++) {
			const currentRow = [];
			for (let column = 0; column < columns; column++) {
				if (
					row === this.state.initialStartNodeRow &&
					column === this.state.initialStartNodeColumn
				) {
					this[`node-${row}-${column}`].className = 'node node_start';
				} else if (
					row === this.state.initialFinishNodeRow &&
					column === this.state.initialFinishNodeColumn
				) {
					this[`node-${row}-${column}`].className = 'node node_finish';
				} else {
					this[`node-${row}-${column}`].className = 'node node_default';
				}
				const newNode = this.createNode(row, column);
				currentRow.push(newNode);
			}
			grid.push(currentRow);
		}
		return grid;
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

	clearVisitedNodes = (grid) => {
		for (let row = 0; row < grid.length; row++) {
			for (let column = 0; column < grid[row].length; column++) {
				if (grid[row][column].isStart === true) {
					this[`node-${row}-${column}`].className = 'node node_start';
				} else if (grid[row][column].isFinish === true) {
					this[`node-${row}-${column}`].className = 'node node_finish';
				} else if (grid[row][column].isWall || grid[row][column].isWeight) {
					continue;
				} else {
					this[`node-${row}-${column}`].className = 'node node_default';
				}
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
			this.setState({ columns: 21 });
		}
		if (x > 600 && x < 1200) {
			this.setState({ columns: 41 });
		}
		if (x > 1200) {
			this.setState({ columns: 61 });
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
		if (this.props.setWeight) return;
		if (this.state.grid[row][column].isStart) {
			this.setState({ startSelected: true, mousePressed: true });
		} else if (this.state.grid[row][column].isFinish) {
			this.setState({ finishSelected: true, mousePressed: true });
		} else {
			const newGrid = this.updateNode(this.state.grid, row, column, ['isWall']);
			this.setState({ grid: newGrid, mousePressed: true });
		}
	}

	handleMouseEnter(row, column) {
		if (!this.state.mousePressed) return;
		if (this.state.startSelected) {
			const newGrid = this.updateNode(this.state.grid, row, column, [
				'isStart',
			]);
			this.setState({
				grid: newGrid,
				startNodeRow: row,
				startNodeColumn: column,
			});
		} else if (this.state.finishSelected) {
			const newGrid = this.updateNode(this.state.grid, row, column, [
				'isFinish',
			]);
			this.setState({
				grid: newGrid,
				finishNodeRow: row,
				finishNodeColumn: column,
			});
		} else {
			const newGrid = this.updateNode(this.state.grid, row, column, ['isWall']);
			this.setState({ grid: newGrid });
		}
	}

	handleMouseLeave(row, column) {
		if (this.state.grid[row][column].isStart && this.state.startSelected) {
			const newGrid = this.updateNode(this.state.grid, row, column, [
				'isStart',
			]);
			this.setState({ grid: newGrid });
		} else if (
			this.state.grid[row][column].isFinish &&
			this.state.finishSelected
		) {
			const newGrid = this.updateNode(this.state.grid, row, column, [
				'isFinish',
			]);
			this.setState({ grid: newGrid });
		}
	}

	handleMouseUp() {
		if (this.state.startSelected) {
			this.setState({
				startSelected: false,
			});
		}
		if (this.state.finishSelected) {
			this.setState({
				finishSelected: false,
			});
		}
		this.setState({ mousePressed: false });
	}

	handleMouseClick(row, column) {
		if (this.props.setWeight) {
			const newGrid = this.updateNode(this.state.grid, row, column, {
				weight: this.state.grid[row][column].weight + 1,
			});
			this.setState({ grid: newGrid });
		}
	}

	render() {
		const { grid } = this.state;
		return (
			<IconContext.Provider value={{ size: '20px', className: 'icon' }}>
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
												onClick={(row, column) =>
													this.handleMouseClick(row, column)
												}
												onMouseDown={(row, column) =>
													this.handleMouseDown(row, column)
												}
												onMouseUp={() => this.handleMouseUp()}
												onMouseEnter={(row, column) =>
													this.handleMouseEnter(row, column)
												}
												onMouseLeave={(row, column) =>
													this.handleMouseLeave(row, column)
												}
												onKeyPress={(e) => this.handleKeyPress(e)}></Node>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</IconContext.Provider>
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
		let path;
		let walls;

		switch (algorithmName) {
			case 'dijkstras':
				visitedInOrder = dijkstras.run(grid, startNode, finishNode);
				shortestInOrder = dijkstras.getShortestPath(finishNode);
				this.animate(visitedInOrder, shortestInOrder);
				break;
			case 'astar':
				visitedInOrder = astar.run(grid, startNode, finishNode);
				shortestInOrder = astar.getShortestPath(finishNode);
				this.animate(visitedInOrder, shortestInOrder);
				break;
			case 'breadthFirst':
				visitedInOrder = breadthFirst.run(grid, startNode, finishNode);
				shortestInOrder = breadthFirst.getShortestPath(finishNode);
				this.animate(visitedInOrder, shortestInOrder);
				break;
			case 'btree':
				this.clearWalls(grid);
				const btree = new binaryTreeMaze(grid);
				path = btree.generate();
				walls = btree.getWalls(grid, path);
				this.animateMaze(walls);
				break;
			case 'depthFirst':
				this.clearWalls(grid);
				const depthFirst = new depthFirstMaze(grid);
				path = depthFirst.generate(grid[startNodeRow][startNodeColumn]);
				walls = depthFirst.getWalls(grid, path);
				console.log(walls);
				this.animateMaze(walls);
				break;
			default:
				return;
		}
		if (this.state.hasRun) {
			this.clearVisitedNodes(grid);
		}
	}

	animateMaze(pathArray) {
		for (let i = 0; i < pathArray.length; i++) {
			setTimeout(() => {
				const node = pathArray[i];
				const newGrid = this.updateNode(
					this.state.grid,
					node.row,
					node.column,
					{
						isWall: true,
					}
				);
				this.setState({ grid: newGrid });
			}, 10 * i);
		}
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
				row === this.state.initialStartNodeRow &&
				column === this.state.initialStartNodeColumn,
			isFinish:
				row === this.state.initialFinishNodeRow &&
				column === this.state.initialFinishNodeColumn,
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
