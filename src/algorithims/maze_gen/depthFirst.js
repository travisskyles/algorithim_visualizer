export function depthFirstMaze(grid, options) {
	this.grid = grid || [];
	this.options = options || {};
}

depthFirstMaze.prototype.generate = function (startNode) {
	if (!this.grid) return false;

	const newGrid = [...this.grid];
	// set starting node and add to stack
	// const start = { node: startNode };
	const stack = [];
	const path = [];

	stack.push(startNode);
	path.push(startNode);

	while (!!stack.length) {
		const viableNeighbors = [];
		// pop top of stack and mark as traveled
		let current = stack.pop();
		path.push(current.node);

		// get all neighbors 2 spaces away each direction
		let neighbors = _getNeighbors(current, newGrid);
		// if no neighbors continue
		if (!neighbors.length) {
			continue;
		}
		// loop through neighbors and check if they are undefined or already visited
		// push all others into viable
		for (let neighbor of neighbors) {
			if (!neighbor || path.includes(neighbor)) {
				continue;
			} else {
				viableNeighbors.push(neighbor);
			}
		}

		if (!viableNeighbors.length) {
			continue;
		} else {
			// loop through viable and get the node between it and current
			// push both viable and previous into visited
			for (let i = 0; i < viableNeighbors.length; i++) {
				const previous = _getPrevious(current, viableNeighbors[i], newGrid);
				path.push(previous);
				path.push(viableNeighbors[i]);
			}
			// randomly pick push the viable into the stack
			let tracker = viableNeighbors.length;
			const usedInts = [];
			while (tracker > 0) {
				let randInt = Math.floor(
					Math.random() * Math.floor(viableNeighbors.length)
				);
				if (!usedInts.includes(randInt)) {
					usedInts.push(randInt);
					stack.push(viableNeighbors[randInt]);
					tracker--;
				}
			}
		}
	}

	return [...new Set(path)];
};

depthFirstMaze.prototype.getWalls = function (grid, pathArray) {
	const flat = grid.flat();
	const wallsArray = flat.filter((el) => !pathArray.includes(el));
	return wallsArray;
};

const _getPrevious = function (current, neighbor, grid) {
	if (!current || !neighbor || !grid) return console.error('Missing Args');
	let middleNode;
	if (current.row < neighbor.row && current.column === neighbor.column) {
		middleNode = grid[current.row + 1][current.column];
	} else if (current.row > neighbor.row && current.column === neighbor.column) {
		middleNode = grid[current.row - 1][current.column];
	} else if (current.row === neighbor.row && current.column < neighbor.column) {
		middleNode = grid[current.row][current.column + 1];
	} else if (current.row === neighbor.row && current.column > neighbor.column) {
		middleNode = grid[current.row][current.column - 1];
	}

	return middleNode;
};
// get neighbors 2 out
const _getNeighbors = function (node, grid) {
	if (!node || !grid) return console.error('Missing Args');
	const neighbors = [];
	const { column, row } = node;

	if (row > 1) neighbors.push(grid[row - 2][column]);
	if (row < grid.length - 2) neighbors.push(grid[row + 2][column]);
	if (column > 1) neighbors.push(grid[row][column - 2]);
	if (column < grid[0].length - 2) neighbors.push(grid[row][column + 2]);

	return neighbors;
};
