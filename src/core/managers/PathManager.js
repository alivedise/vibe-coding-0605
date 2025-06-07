// src/core/managers/PathManager.js
import { WeightedGraph } from "@/graph/dijkstra";

class PathManager {
  constructor() {
    this.pathMap = new Map();
    this.paths = [];
    this.graph = null;
  }

  update(context) {
    if (!this.graph && context.mapManager.tiles.value.length > 0) {
      this.constructPaths(context);
    }
  }

  constructPaths(context) {
    const graph = new WeightedGraph();
    const tiles = context.mapManager.tiles.value;
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      graph.addVertex(tile.id);
    }
    // call addedge. assume each tile has connected to 4 neighbors
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      const neighbors = context.mapManager.getNeighbors(tile.x, tile.y);
      for (let j = 0; j < neighbors.length; j++) {
        const neighbor = neighbors[j];
        const neighborTile = context.mapManager.getTileAt(neighbor.x, neighbor.y);
        if (neighborTile) {
          graph.addEdge(tile.id, neighborTile.id, 1);
        }
      }
    }
    this.graph = graph;
  }

  findPath(start, end) {
    if (!this.graph) {
      return [];
    }
    return this.graph.Dijkstra(start, end);
  }
}

export default PathManager;
