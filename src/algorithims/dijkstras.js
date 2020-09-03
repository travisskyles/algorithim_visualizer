export const dijkstras = {
	run: function (grid, startNode, finishNode) {
		// ensure all parameter exist and start and finish are not the same
		if (!grid || !startNode || !finishNode || startNode === finishNode) {
			return false;
		}
		const visited = [];

		// const unvisited = _getNodes(grid);
		const unvisited = [];

		startNode.distance = 0;
		unvisited.push(startNode);
		// loop while there are nodes in unvisited
		while (!!unvisited.length) {
			// sort the unvisited nodes from smallest to largest and set the current node as the first from the array
			this._sortNodesByDistance(unvisited);
			let current = unvisited.shift();

			if (current === finishNode) return visited;
			// If current node is a wall continue
			if (current.isWall) continue;
			// when all unvisited neighbor nodes of the current node have been mapped, mark the current node as visited, removing it from the unvisited set
			current.isVisited = true;
			visited.push(current);

			let neighbors = this._getNeighbors(current, grid);
			for (let neighbor of neighbors) {
				if (neighbor.isWall || visited.includes(neighbor)) {
					continue;
        }
        
        let gScore = current.distance + neighbor.weight;
        let gScoreIsBest = false;

        if(!unvisited.includes(neighbor)){
          gScoreIsBest = true;
          unvisited.push(neighbor);
        }
        else if(gScore < neighbor.distance) {
          gScoreIsBest = true;
        }

        if(gScoreIsBest){
          neighbor.distance = current.distance + neighbor.weight;
          neighbor.previousNode = current;
        }
			}

			// if (current.distance === Infinity || current === finishNode)
			// 	return visitedNodesInOrder;

			// _updateNeighbors(current, grid);
			// current.isCurrent = false;
		}
		return [];
	},

	// _updateNeighbors: function(node, grid){
	//   const newNeighbors = _getNewNeighbors(node, grid);
	//   for(let neighbor of newNeighbors){
	//     neighbor.distance = node.distance + neighbor.weight;
	//     neighbor.previousNode = node;
	//   }
	// },

	_getNeighbors: function (node, grid) {
		const neighbors = [];
		const { column, row } = node;
		if (row > 0) neighbors.push(grid[row - 1][column]);
		if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
		if (column > 0) neighbors.push(grid[row][column - 1]);
		if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);
    // return neighbors.filter((neighbor) => !neighbor.isVisited);
    return neighbors;
	},

	_getNodes: function (grid) {
		let nodes = [];
		for (let row of grid) {
			for (let node of row) {
				nodes.push(node);
			}
		}
		return nodes;
	},

	_sortNodesByDistance: function (unvistedNodes) {
		return unvistedNodes.sort(
			(nodeA, nodeB) => nodeA.distance - nodeB.distance
		);
	},

	getShortestPath: function (finishNode) {
		const nodesInShortestPathOrder = [];
		let currentNode = finishNode;
		while (!!currentNode) {
			nodesInShortestPathOrder.unshift(currentNode);
			currentNode = currentNode.previousNode;
		}
		return nodesInShortestPathOrder;
	},
};






