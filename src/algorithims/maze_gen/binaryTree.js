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

	let neighborH;
	let neighborV;

	for (let row = 0; row > grid.length - 1; row++) {
		for (let col = 0; col > grid[row].length - 1; col++) {
			neighborH = grid[col - 1][row];
			neighborV = grid[col][row - 1];

			// if(!neighborH && !neighborV){
			//   continue;
			// }
			// else if(!neighborH && neighborV){

			// }
			if (neighborH && neighborV) {
				let int = Math.round(Math.random());
				if (int === 1) {
					neighborH.isWall = true;
				} else {
					neighborV.isWall = true;
				}
			}
		}
	}
};

// binaryTreeMaze.prototype.getNeighbors(x, y){
//   const neighbors = {};
// }
