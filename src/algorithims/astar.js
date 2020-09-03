// A* Search Algorithm
export const astar = {
    init: function(grid){
    let nodes = [];
    for (let row of grid) {
      for (let node of row) {
        node.f = Infinity;
        node.g = Infinity;
        node.h = Infinity;
      }
    }
    return nodes;
  },

  run: function(grid, startNode, finishNode){
    // ensure all parameter exist and start and finish are not the same
      if (!grid || !startNode || !finishNode || startNode === finishNode) {
        return false;
      }

      const open = [];
      const closed = [];
      startNode.g = 0;
      startNode.f = this._heuristic(startNode, finishNode);
      open.push(startNode);

      while(!!open.length){
        this._sortNodesByDistance(open);
        let current = open.shift();
        if (current === finishNode){
          return closed;
        }
        if(current.isWall) continue;
        current.isVisited = true;
        closed.push(current);

        let neighbors = this._getNeighbors(current, grid)

        for (let neighbor of neighbors) {
          if(neighbor.isWall || closed.includes(neighbor)){
            // not a valid node. skip to the next neighbor
            continue;
          }

          let gScore = current.g + current.weight;
          let gScoreIsBest = false;

          if(!open.includes(neighbor)){
            gScoreIsBest = true;
            neighbor.h = this._heuristic(neighbor, finishNode);
            open.push(neighbor);
          }
          else if(gScore < neighbor.g){
            gScoreIsBest = true;
          }

          if(gScoreIsBest){
            neighbor.previousNode = current;
            neighbor.g = gScore;
            neighbor.f = neighbor.g + neighbor.h;
          }
        }
      }
    return [];
  },

  getShortestPath: function(finishNode){
    let current = finishNode;
    const result = [];
    while(current.previousNode){
      result.push(current);
      current = current.previousNode;
    }
    return result.reverse();
  },

  _heuristic: function(currentNode, neighborNode){
    // Manhattan version
    let h =
      Math.abs(currentNode.column - neighborNode.column) +
      Math.abs(currentNode.row - neighborNode.row);
    return h;
  },

  _getNeighbors: function(node, grid) {
    const neighbors = [];
    const { column, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][column]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
    if (column > 0) neighbors.push(grid[row][column - 1]);
    if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);

    return neighbors;
  },

  // _updateNeighbors: function(node, neighbors) {
  //   for (let neighbor of neighbors) {
  //     neighbor.distance = node.distance + neighbor.weight;
  //     neighbor.previousNode = node;
  //   }
  //   return neighbors;
  // },

  _sortNodesByDistance: function(arr) {
    return arr.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
  }
}
