export function dijkstras(grid, startNode, finishNode) {
  if (
    !grid ||
    !startNode ||
    !finishNode ||
    startNode === finishNode
  ) {
    return false;
  }
  const visitedNodesInOrder = [];
  // begin with a set of nodes all unvisited
  // create a set of unvisited nodes
  const unvisited = _getNodes(grid);
  // assign every node an initial distance value. this will be zero for the starting node and infinity for other nodes
  startNode.distance = 0;
  // loop while there are nodes in unvisited
  while(!!unvisited.length){
    // sort the unvisited nodes from smallest to largest and set the current node as the first from the array
    _sortNodesByDistance(unvisited);
    let current = unvisited.shift();
    current.isCurrent = true;
    // If current node is a wall continue
    if (current.isWall) continue;
    // when all unvisited neighbor nodes of the current node have been mapped, mark the current node as visited, removing it from the unvisited set
    current.isVisited = true;
    visitedNodesInOrder.push(current);
    // if the destination node has been marked visited or the smallest tentative distance from start to the unvisited set is infinity(meaning there is no connection between the start and remaining unvisited nodes) then stop.
    if(current.distance === Infinity || current === finishNode) return visitedNodesInOrder;
    // otherwise select the unvistited node with the smallest tentative distance and set it as the new current node and repeat the process of calculating the distance to each unvisited neighbor node
    // for each current node calculate the distance to each of its unvisited neighbor nodes. add the disance from the current node to the neighbor node to the distance from the starting node.
    _updateNeighbors(current, grid);
    current.isCurrent = false;
  }
}

function _updateNeighbors(node, grid){
  const newNeighbors = _getNewNeighbors(node, grid);
  for(let neighbor of newNeighbors){
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function _getNewNeighbors(node, grid){
  const neighbors = [];
  const {column, row} = node;
  if(row > 0) neighbors.push(grid[row - 1][column]);
  if(row < grid.length - 1) neighbors.push(grid[row + 1][column]);
  if(column > 0) neighbors.push(grid[row][column - 1]);
  if(column < grid[0].length -1) neighbors.push(grid[row][column + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function _getNodes(grid){
  let nodes = [];
  for(let row of grid){
    for(let node of row){
      nodes.push(node)
    }
  }
  return nodes;
}

function _sortNodesByDistance(unvistedNodes){
  return unvistedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

export function getNodesInShortestOrder(finishNode){
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while(!!currentNode){
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}







