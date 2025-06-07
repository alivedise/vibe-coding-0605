// src/core/managers/PathManager.js
import { WeightedGraph } from "@/graph/dijkstra";
import Path from '@/core/models/Path';

class PathManager {
  constructor() { // Added mapManager dependency
    this.pathMap = new Map(); // Consider if this is still needed or if cache is per-Path object
    this.paths = []; // Consider if this is still needed
    this.graph = null;
    console.log("PathManager initialized with MapManager");
  }

  update(context) {
    if (!this.graph) {
      this.constructPaths(context);
    }
  }

  constructPaths(context) {
    const graph = new WeightedGraph();
    const tiles = context.mapManager.tiles.value;
    if (!tiles || tiles.length === 0) {
      console.error('No tiles found in mapManager');
      return;
    }
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
          const start = tile.getCenterPoint();
          const end = neighborTile.getCenterPoint();
          const path = new Path(start.x, start.y, end.x, end.y);
          this.paths.push(path);
          this.pathMap.set(`${tile.id}/${neighborTile.id}`, path);
        }
      }
    }
    this.graph = graph;
  }

  findPath(startTileId, endTileId) {
    if (!this.graph) {
      console.warn('[PathManager] Graph not constructed. Cannot find path.');
      return null;
    }
    if (!startTileId || !endTileId) {
      console.warn('[PathManager] Start or end tile ID is missing.');
      return null;
    }

    const paths = this.graph.Dijkstra(startTileId, endTileId);
    console.log(paths);
    return paths.map((path, index) => {
      if (index === paths.length - 1) return;
      console.log(`Path ${path} to ${paths[index + 1]}`);
      return this.pathMap.get(`${path}/${paths[index + 1]}`);
    }).filter((path) => path !== undefined).map((path) => path.points).flat();
  }
}

export default PathManager;
