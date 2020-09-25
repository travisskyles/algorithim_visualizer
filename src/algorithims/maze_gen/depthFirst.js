export function depthFirstMaze(grid, options) {
	this.grid = grid || [];
	this.options = options || {};
}

depthFirstMaze.prototype.generate = function (startNode) {
	if (!this.grid) return false;

	const newGrid = [...this.grid];
	// set starting node and add to stack
	const stack = [];
	const path = [];
	let TESTIDX = 0;
	// let current = newGrid[0][0];
	stack.push({ node: startNode });
	// console.log(path);
	// while stack is not empty
	while (!!stack.length) {
		// while (TESTIDX < 10) {
		// 	TESTIDX++;
		const viableNeighbors = [];
		// pop top of stack and mark as traveled
		console.log('stack', stack);
		let current = stack.pop();
		if (current.dir) {
			const previous = _getPrevious(current, newGrid);
			path.push(previous);
		}
		path.push(current.node);
		console.log('current', current);

		// console.log('stack', stack);
		// console.log('current', current);
		// get all unvisited neighbors each direction
		let neighbors = _getNeighbors(current, newGrid);
		if (!neighbors.length) {
			continue;
		}
		// console.log('neighbors', neighbors);
		for (let neighbor of neighbors) {
			if (!neighbor || path.includes(neighbor.node)) {
				continue;
			} else {
				viableNeighbors.push(neighbor);
			}
		}
		// console.log('Viable', viableNeighbors);
		if (!viableNeighbors.length) {
			continue;
		} else {
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
			// for (let i = 0; i < viableNeighbors.length; i++) {
			// 	// console.log('usedInts', usedInts);

			// 	let randInt = Math.floor(
			// 		Math.random() * Math.floor(viableNeighbors.length)
			// 	);
			// 	if (!usedInts.includes(randInt)) {

			// 		usedInts.push(randInt);
			// 		stack.push(viableNeighbors[randInt]);
			// 	}
			// }
		}

		// 	const newNeighbor = _getNeighborNext(neighbor, newGrid);

		// 	// check if neighbor.next is visited
		// 	// if yes, ignore
		// 	if (!neighbor.next || path.includes(newNeighbor.next)) {
		// 		continue;
		// 	}
		// 	// if no push newNeighbor.node into path
		// 	else {
		// 		if (!path.includes(newNeighbor.node)) {
		// 			path.push(newNeighbor.node);
		// 		}
		// 		console.log('path', path);
		// 		// console.log('newNeighborVia', newNeighbor);

		// 		viableNeighbors.push(newNeighbor.next);
		// 	}
		// 	// and push neighbor.next into viableneighbors
		// }
		// removed undefined
		// viableNeighbors.filter((el) => (el ? true : false));
		// check if vianeighbors is not empty
		// if yes, continue
		// if no, randomly add them to stack
		// if (!viableNeighbors.length) {
		// 	continue;
		// } else {
		// 	const usedInts = [];
		// 	for (let i = 0; i < viableNeighbors.length; i++) {
		// 		// console.log('usedInts', usedInts);

		// 		let randInt = Math.floor(
		// 			Math.random() * Math.floor(viableNeighbors.length)
		// 		);
		// 		if (!usedInts.includes(randInt)) {
		// 			usedInts.push(randInt);
		// 			stack.push(viableNeighbors[randInt]);
		// 		}
		// 	}
	}
	console.log('Path', path);

	return path;
};

depthFirstMaze.prototype.getWalls = function (grid, pathArray) {
	const flat = grid.flat();
	const wallsArray = flat.filter((el) => !pathArray.includes(el));
	return wallsArray;
};

const _getPrevious = function (node, grid) {
	let previous;
	switch (node.dir) {
		case 'north':
			// console.log(node);
			previous = grid[node.node.row + 1][node.node.column];
			break;
		case 'south':
			// console.log(node);
			previous = grid[node.node.row - 1][node.node.column];
			break;
		case 'west':
			// console.log(node);
			previous = grid[node.node.row][node.node.column + 1];
			break;
		case 'east':
			// console.log(node);
			previous = grid[node.node.row][node.node.column - 1];
			break;
		default:
			break;
	}
	return previous;
};
// get neighbors 2 out
const _getNeighbors = function (node, grid) {
	if (!node || !grid) return console.error('Missing Args');
	const neighbors = [];
	const { column, row } = node.node;

	if (row > 1) neighbors.push({ dir: 'north', node: grid[row - 2][column] });
	if (row < grid.length - 2)
		neighbors.push({ dir: 'south', node: grid[row + 2][column] });
	if (column > 1) neighbors.push({ dir: 'west', node: grid[row][column - 2] });
	if (column < grid[0].length - 2)
		neighbors.push({ dir: 'east', node: grid[row][column + 2] });

	return neighbors;
};

const _getNeighborNext = function (node, grid) {
	const newNode = node;
	// console.log('_getNeighborNext', newNode, grid);
	switch (newNode.dir) {
		case 'north':
			if (grid[newNode.node.row - 1][newNode.node.column]) {
				newNode.next = grid[newNode.node.row - 1][newNode.node.column];
			} else {
				newNode.next = null;
			}
			break;
		case 'south':
			if (grid[newNode.node.row + 1][newNode.node.column]) {
				newNode.next = grid[newNode.node.row + 1][newNode.node.column];
			} else {
				newNode.next = null;
			}
			break;
		case 'west':
			if (grid[newNode.node.row][newNode.node.column - 1]) {
				newNode.next = grid[newNode.node.row][newNode.node.column - 1];
			} else {
				newNode.next = null;
			}
			break;
		case 'east':
			if (grid[newNode.node.row][newNode.node.column + 1]) {
				newNode.next = grid[newNode.node.row][newNode.node.column + 1];
			} else {
				newNode.next = null;
			}
			break;
		default:
			break;
	}
	return newNode;
};
