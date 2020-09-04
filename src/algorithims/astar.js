// A* Search Algorithm
/**
 * @module astar
 */
export const astar = {
	/**
	 * initializes the grid by adding f(x), g(x), and h(x) all set to Infinity to every node in the grid
	 * @function init
	 * @private
	 * @param {matrix} grid the incoming matrix of nodes
	 */
	_init: function (grid) {
		for (let row of grid) {
			for (let node of row) {
				node.f = Infinity;
				node.g = Infinity;
				node.h = Infinity;
			}
		}
	},
	/**
	 * runs the A-star algorithim
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
		// add f,g,h values to all nodes
		astar._init(grid);

		// create an open (not yet visited) and closed (visited) list; could optimize in future with heap or priority queue
		// set starting node values for f,g
		// set starting node as first unvisited
		const open = [];
		const closed = [];
		startNode.g = 0;
		startNode.f = this._heuristic(startNode, finishNode);
		open.push(startNode);

		while (!!open.length) {
			// find the lowest f(x) value in open list
			// take the lowest value and set to current
			this._sortNodesByDistance(open);
			let current = open.shift();

			if (current === finishNode) return closed;
			if (current.isWall) continue;

			// set current as visited
			// push current to closed list
			closed.push(current);

			// get the neighbors of current
			// then do stuff with neighbors
			let neighbors = this._getNeighbors(current, grid);
			for (let neighbor of neighbors) {
				// not a valid node. skip to the next neighbor
				if (neighbor.isWall || closed.includes(neighbor)) {
					continue;
				}

				// set gScore as the current distance from the start through the current node
				// gScoreIsBest is false because we still need to check to see if this one is the best
				let gScore = current.g + neighbor.weight;
				let gScoreIsBest = false;

				// first time arriving at this node so it must be the best currently
				// set the heuristic for the first time
				// push into open
				if (!open.includes(neighbor)) {
					gScoreIsBest = true;
					neighbor.h = this._heuristic(neighbor, finishNode);
					open.push(neighbor);
				}
				// node has been visited but last time it had a worse g(x)
				else if (gScore < neighbor.g) {
					gScoreIsBest = true;
				}

				// current path is the best
				// set info about it
				if (gScoreIsBest) {
					neighbor.previousNode = current;
					neighbor.g = gScore;
					neighbor.f = neighbor.g + neighbor.h;
				}
			}
		}
		return [];
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
	/**
	 * the Manhattan version of a heuristic calculation
	 * @function _heuristic
	 * @private
	 * @param {node} currentNode current node
	 * @param {node} neighborNode neighbor of current node
	 * @returns {number} the sum of the absolute value of currentNode.x - neighborNode.x and the absolute value of currentNode.y - neighborNode.y
	 */
	_heuristic: function (currentNode, neighborNode) {
		// Manhattan version
		let h =
			Math.abs(currentNode.column - neighborNode.column) +
			Math.abs(currentNode.row - neighborNode.row);
		return h;
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
		return arr.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
	},
};
