export function binaryTreeMaze(grid, options) {
	this.grid = grid || [];
	this.options = options || {};
}

binaryTreeMaze.prototype.generate = function () {
	// ensure all parameter exist and start and finish are not the same
	if (!this.grid) {
		return false;
	}

	const newGrid = [...this.grid];
	const path = [];

	let neighborH;
	let neighborV;
	let current;

	// set all grid squares to walls
	for (let row = 0; row < newGrid.length; row++) {
		for (let col = 0; col < newGrid[row].length; col++) {
			if (row === 0 || col === 0) {
				path.push(newGrid[row][col]);
			}
		}
	}

	for (let row = 0; row <= newGrid.length; row += 2) {
		for (let col = 0; col <= newGrid[row].length; col += 2) {
			current = newGrid[row][col];

			path.push(current);

			if (col > 0) {
				neighborH = newGrid[row][col - 1];
			} else {
				neighborH = undefined;
			}
			if (row > 0) {
				neighborV = newGrid[row - 1][col];
			} else {
				neighborV = undefined;
			}

			if (neighborH && neighborV) {
				let int = Math.round(Math.random());
				if (int === 1) {
					path.push(neighborH);
				}
				if (int === 0) {
					path.push(neighborV);
				}
			}
		}
	}
	return [...new Set(path)];
};

binaryTreeMaze.prototype.getWalls = function (grid, pathArray) {
	const flat = grid.flat();
	const wallsArray = flat.filter((el) => !pathArray.includes(el));
	return wallsArray;
};
