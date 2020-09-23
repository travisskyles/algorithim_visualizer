export function binaryTreeMaze(options) {
	this.options = options || {};
}

binaryTreeMaze.prototype.generate = function (grid) {
	// ensure all parameter exist and start and finish are not the same
	if (!grid) {
		return false;
	}

	const newGrid = [...grid];
	const path = [];

	let neighborH;
	let neighborV;
	let current;

	// set all grid squares to walls
	for (let row = 0; row < newGrid.length; row++) {
		for (let col = 0; col < newGrid[row].length; col++) {
			newGrid[row][col].isWall = true;
			if (row === 0 || col === 0) {
				newGrid[row][col].isWall = false;
			}
		}
	}

	// ensure final square
	// newGrid[newGrid.length - 1][
	// 	newGrid[newGrid.length - 1].length - 1
	// ].isWall = false;
	// console.log(1, grid.length);
	for (let row = 0; row <= newGrid.length; row += 2) {
		// console.log(newGrid.length);
		for (let col = 0; col <= newGrid[row].length; col += 2) {
			// console.log(newGrid[row].length);
			current = newGrid[row][col];

			// current.isWall = false;
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
				// console.log(row, col, neighborH);
				let int = Math.round(Math.random());
				if (int === 1) {
					path.push(neighborH);
					// neighborH.isWall = false;
				}
				if (int === 0) {
					path.push(neighborV);
					// neighborV.isWall = false;
				}
			}
			// console.log(current);
		}
	}
	return path;
};
