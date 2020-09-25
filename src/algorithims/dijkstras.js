// Dijkstras Search Algorithm
/**
 * @module dijkstras
 */
export const dijkstras = {
	/**
	 * runs dijkstras algorithim
	 * @function run
	 * @param {matrix} grid matrix of nodes
	 * @param {node} finishNode  node that it ends at
	 * @param {node} startNode node that it starts from
	 * @returns {(matrix|array)} array of all visited nodes in order or empty array if path could not be found
	 */
	run: function (grid, startNode, finishNode) {
		// ensure all parameter exist and start and finish are not the same
		if (!grid || !startNode || !finishNode || startNode === finishNode) {
			return false;
		}
		// create visited an unvisited lists
		const visited = [];
		const unvisited = [];
		// set startNode distance to 0 and put into unvisited list
		startNode.distance = 0;
		unvisited.push(startNode);

		while (!!unvisited.length) {
			// sort the unvisited nodes from smallest to largest
			// set the current node as the first from the array
			this._sortNodesByDistance(unvisited);
			let current = unvisited.shift();
			if (current === finishNode) {
				visited.push(current);
				return visited;
			}
			if (current.isWall) continue;

			// set current as visited
			// push current into visited list
			visited.push(current);

			// get the neighbors of current
			// then do stuff with neighbors
			let neighbors = this._getNeighbors(current, grid);
			for (let neighbor of neighbors) {
				if (neighbor.isWall || visited.includes(neighbor)) {
					continue;
				}

				// set gScore as the current distance from the start through the current node
				// gScoreIsBest is false because we still need to check to see if this one is the best
				let gScore = current.distance + neighbor.weight;
				let gScoreIsBest = false;

				// first time arriving at this node so it must be the best currently
				// push into open
				if (!unvisited.includes(neighbor)) {
					gScoreIsBest = true;
					unvisited.push(neighbor);
					// node has been visited but last time it had a worse g(x)
				} else if (gScore < neighbor.distance) {
					gScoreIsBest = true;
				}

				// current path is the best
				// set info about it
				if (gScoreIsBest) {
					neighbor.distance = current.distance + neighbor.weight;
					neighbor.previousNode = current;
				}
			}
		}
		return [];
	},

	/**
	 * finds the neighbors of a node in 4 directions
	 * @function _getNeighbors
	 * @private
	 * @param {node} node a node in a matrix
	 * @param {matrix} grid a matrix of nodes
	 * @returns {array} a list of the 4 neighbor nodes of the inputted node
	 */
	_getNeighbors: function (node, grid) {
		const neighbors = [];
		const { column, row } = node;
		if (row > 0) neighbors.push(grid[row - 1][column]);
		if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
		if (column > 0) neighbors.push(grid[row][column - 1]);
		if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);

		return neighbors;
	},

	/**
	 * sorts a list of nodes by their f(x) values
	 * @function _sortNodesByDistance
	 * @private
	 * @param {array} arr a list of nodes
	 * @returns {array} sorted array
	 */
	_sortNodesByDistance: function (arr) {
		return arr.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
	},

	/**
	 * takes the finish node and works backwards to get a list of the nodes in the shortest path from start to finish.
	 * @function getShortestPath
	 * @param {node} finishNode end goal node of the search
	 * @returns {array} array of nodes of shortest path
	 */
	getShortestPath: function (finishNode) {
		let current = finishNode;
		const result = [];
		while (current.previousNode) {
			result.push(current);
			current = current.previousNode;
		}
		// makes sure to include starting node
		result.push(current);
		return result.reverse();
	},
};
