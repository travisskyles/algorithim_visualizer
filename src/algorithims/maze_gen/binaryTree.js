export function binaryTreeMaze(options) {
	this.options = options || {};
	// this.startPosition = options.startPosition || 'upperLeft';
	// this.startX;
	// this.startY;
	// this.travelDirectionX;
	// this.travelDirectionY;

	// switch (this.startPosition) {
	// 	case 'upperLeft':
	// 		this.startX = 0;
	//     this.startY = 0;
	//     this.travelDirectionX = 1;
	//     this.travelDirectionY = 1;
	// 		break;
	// 	case 'lowerLeft':
	// 		this.startX = grid.length - 1;
	//     this.startY = 0;
	//     this.travelDirectionX = -1;
	//     this.travelDirectionY = 1;
	// 		break;
	// 	case 'upperRight':
	// 		this.startX = 0;
	//     this.startY = grid[0].length - 1;;
	//     this.travelDirectionX = 1;
	//     this.travelDirectionY = -1;
	// 		break;
	// 	case 'lowerRight':
	//     this.startX = grid[grid.length - 1].length - 1;
	// 		this.startY = grid[0].length - 1;
	//     this.travelDirectionX = -1;
	//     this.travelDirectionY = -1;
	// 		break;
	// 	default:
	// 		break;
	// }
}

binaryTreeMaze.prototype.generate = function (grid) {
	// ensure all parameter exist and start and finish are not the same
	if (!grid) {
		return false;
	}
	// let x = this.startX;
	// let y = this.startY;
	// let endX = grid.length -1;
	// let endY = grid[grid.length - 1].length - 1
	// let current = grid[x][y];

	// while(current !== grid[endX][endY]){
	//   current = current
	// }
	const newGrid = grid;

	let neighborH;
	let neighborV;

	// console.log(1, grid.length);
	for (let row = 0; row < newGrid.length; row += 2) {
		// console.log(newGrid.length);
		for (let col = 0; col < newGrid[row].length; col++) {
			// console.log(newGrid[row].length);
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

			// if (neighborH.isWall === true) {
			// 	n;
			// }
			// if(!neighborH && !neighborV){
			//   continue;
			// }
			// else if(!neighborH && neighborV){

			// }
			if (neighborH && neighborV) {
				console.log(row, col, neighborH);
				let int = Math.round(Math.random());
				if (int === 1) {
					neighborH.isWall = true;
				}
				if (int === 0) {
					neighborV.isWall = true;
				}
			}
		}
	}
	console.log(grid);
	console.log(newGrid);
};

binaryTreeMaze.prototype.choosePath = function (neighborA, neighborB) {
	// if(neighbor)
	let int = Math.round(Math.random());
};
