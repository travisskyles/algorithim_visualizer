import React from 'react';
import {
  dijkstras,
  getNodesInShortestOrder
} from '../../algorithims/dijkstras';
import Node from '../Node/Node';
import './Grid.css';

export default class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      grid: [],
      startNodeRow: 15,
      startNodeColumn: 5,
      finishNodeRow: 15,
      finishNodeColumn: 60,
    };
    
  }


	componentDidMount() {
    const grid = this.createGrid();
		this.setState({ grid });
  }
  
  handleClick = () => {
    this.animateDijkstras();
  }

  animateDijkstras(){
    const {grid, startNodeRow, startNodeColumn, finishNodeRow, finishNodeColumn} = this.state;
    const startNode = grid[startNodeRow][startNodeColumn];
    const finishNode = grid[finishNodeRow][finishNodeColumn];
    const visitedInOrder = dijkstras(grid, startNode, finishNode);
    const nodesInShortestOrder = getNodesInShortestOrder(finishNode);
    console.log(nodesInShortestOrder);

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
			</div>
		);
  }
  
  createGrid(){
    const grid = [];
    for (let row = 0; row < 30; row++) {
      const currentRow = [];
      for (let column = 0; column < 65; column++) {
        const currentNode = {
          column,
          row,
          isStart: row === this.state.startNodeRow && column === this.state.startNodeColumn,
          isFinish: row === this.state.finishNodeRow && column === this.state.finishNodeColumn,
          distance: Infinity,
        };
        currentRow.push(currentNode);
      }
      grid.push(currentRow);
    }
    return grid;
  };
}


