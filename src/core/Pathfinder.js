// src/core/Pathfinder.js
import { TERRAIN_TYPES } from "@/constants/terrainTypes";

// Basic MinPriorityQueue (can be improved with a heap later for performance)
class MinPriorityQueue {
  constructor() {
    this.elements = []; // Store {element, priority}
  }
  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority); // Keep sorted
  }
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.elements.shift().element;
  }
  isEmpty() {
    return this.elements.length === 0;
  }
}

function getNeighbors(x, y, width, height) {
  const neighbors = [];
  // Only cardinal directions, cost 1
  const directions = [
    { dx: 0, dy: -1 }, // Up
    { dx: 0, dy: 1 }, // Down
    { dx: -1, dy: 0 }, // Left
    { dx: 1, dy: 0 }, // Right
  ];
  for (const dir of directions) {
    const newX = x + dir.dx;
    const newY = y + dir.dy;
    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      neighbors.push({ x: newX, y: newY });
    }
  }
  return neighbors;
}

function isTraversable(x, y, mapManager, buildingManager) {
  const tile = mapManager.getTileAt(x, y);

  // Check if tile exists and is walkable (terrain property)
  if (!tile || !tile.isWalkable) {
    // console.log(`[Pathfinder isTraversable] Non-existent or non-walkable tile at: (${x},${y})`);
    return false;
  }

  // Check if tile is occupied by a building (buildingId property on Tile)
  if (tile.buildingId) {
    // console.log(`[Pathfinder isTraversable] Tile at (${x},${y}) is occupied by building ${tile.buildingId}`);
    return false;
  }
  
  // Optional: A more robust check if buildings can span multiple tiles and Pathfinder needs to be aware
  // This simplified check assumes if a tile has a buildingId, it's part of that building's footprint.
  // If buildings are large and only mark their origin tile, this part might need enhancement
  // or rely on BuildingManager to mark all occupied tiles correctly.

  return true;
}

const Pathfinder = {
  findPath(startX, startY, endX, endY, mapManager, buildingManager) {
    const { width, height } = mapManager;
    const openSet = new MinPriorityQueue();

    const gScore = Array(width * height).fill(Infinity);
    const cameFrom = Array(width * height).fill(null);

    const startIndex = startY * width + startX;
    gScore[startIndex] = 0;
    openSet.enqueue({ x: startX, y: startY, index: startIndex }, 0);

    while (!openSet.isEmpty()) {
      const current = openSet.dequeue();
      if (!current) break; // Should not happen if not empty, but defensive

      if (current.x === endX && current.y === endY) {
        const path = [];
        let tempNode = current;
        while (tempNode) {
          path.unshift({ x: tempNode.x, y: tempNode.y });
          const prevIndex = cameFrom[tempNode.y * width + tempNode.x]; // Use 1D index for cameFrom
          if (prevIndex === null || prevIndex === undefined) break;
          // To get x,y from prevIndex for the next tempNode:
          const prevY = Math.floor(prevIndex / width);
          const prevX = prevIndex % width;
          // Find the actual node object that was stored at prevIndex if needed, or just store x,y
          // For simplicity, cameFrom could store {x, y, index} objects if full node info is needed
          // Or, if cameFrom stores the *index* of the predecessor, reconstruct x,y
          // For now, let's assume cameFrom stores the predecessor's {x,y} object directly for path reconstruction
          // This means cameFrom should store objects, not just indices.
          // Let's adjust cameFrom to store the 'current' node object that leads to a neighbor.
          tempNode = cameFrom[tempNode.y * width + tempNode.x]; // This assumes cameFrom stores the predecessor node object
        }
        // console.log(`[Pathfinder] Path found from (${startX},${startY}) to (${endX},${endY}):`, JSON.stringify(path));
        return path;
      }

      const neighbors = getNeighbors(current.x, current.y, width, height);
      for (const neighbor of neighbors) {
        if (!isTraversable(neighbor.x, neighbor.y, mapManager, buildingManager)) {
          continue;
        }

        const neighborTile = mapManager.getTileAt(neighbor.x, neighbor.y);
        const cost = neighborTile ? neighborTile.terrainCost : Infinity; // Assuming terrainCost is on the Tile model
        if (!neighborTile) continue; // Should not happen if isTraversable passed, but defensive

        const currentIndex = current.y * width + current.x;
        const tentativeGScore = gScore[currentIndex] + cost;

        const neighborIndex = neighbor.y * width + neighbor.x;
        if (tentativeGScore < gScore[neighborIndex]) {
          cameFrom[neighborIndex] = current; // Store the predecessor node itself
          gScore[neighborIndex] = tentativeGScore;
          openSet.enqueue({ ...neighbor, index: neighborIndex }, tentativeGScore); // Enqueue with index
        }
      }
    }
    // console.warn(`[Pathfinder] No path found from (${startX},${startY}) to (${endX},${endY})`);
    return null; // No path found
  },
};

export default Pathfinder;
