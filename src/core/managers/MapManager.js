import {
  TERRAIN_TYPES,
} from "@/constants/terrainTypes";
import { markRaw } from "vue";
import { Tile } from '@/core/models/Tile.js';

class MapManager {
  constructor() {
    console.log("MapManager initialized");
    this.tiles = [];
  }

  update(context) {
    if (this.tiles.length === 0) {
      this.tiles = this.initializeTiles(context);
    }
    // console.log('MapManager update', context);
    // Logic to update map state (e.g., terrain changes, building placements)
    this.tiles.forEach(tile => tile.update(context));
  }

  getRandomTile() {
    const randomIndex = Math.floor(Math.random() * this.tiles.length);
    return this.tiles[randomIndex];
  }

  requestAvailableTiles(availableTileTypeList) {
    // Ensure tiles is an array and not empty before filtering
    if (!Array.isArray(this.tiles) || this.tiles.length === 0) {
      return [];
    }
    return this.tiles.filter(tile => tile && tile.isWalkable === true && tile.buildingId === null && availableTileTypeList.includes(tile.type));
  }

  initializeTiles(context) {
    this.width = context.configurationManager.MAP_WIDTH;
    this.height = context.configurationManager.MAP_HEIGHT;
    this.tileSize = context.configurationManager.TILE_SIZE;
    const flatTiles = [];
    const terrainValues = Object.values(TERRAIN_TYPES);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const randomTerrain =
          terrainValues[Math.floor(Math.random() * terrainValues.length)];
        flatTiles.push(new Tile(x, y, randomTerrain.name, randomTerrain.isWalkable, randomTerrain.terrainCost, this.tileSize));
      }
    }
    console.log("1D Tiles initialized, count:", flatTiles.length);
    return flatTiles;
  }

  getTileAt(x, y) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      const index = y * this.width + x;
      return this.tiles[index];
    }
    return null; // Out of bounds
  }

  getNeighbors(x, y) {
    const neighbors = [];
    if (x > 0) neighbors.push({ x: x - 1, y });
    if (x < this.width - 1) neighbors.push({ x: x + 1, y });
    if (y > 0) neighbors.push({ x, y: y - 1 });
    if (y < this.height - 1) neighbors.push({ x, y: y + 1 });
    return neighbors;
  }

  getTileById(tileId) {
    if (!tileId) return null;
    return this.tiles.find(tile => tile.id === tileId);
  }
}

export default MapManager;
