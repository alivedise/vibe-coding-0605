import {
  TERRAIN_TYPES,
  DEFAULT_MAP_WIDTH,
  DEFAULT_MAP_HEIGHT,
} from "@/constants/terrainTypes";
import { ref } from "vue";
import { Tile } from '@/core/models/Tile.js';

class MapManager {
  constructor(width = DEFAULT_MAP_WIDTH, height = DEFAULT_MAP_HEIGHT) {
    console.log("MapManager initialized");
    this.width = width;
    this.height = height;
    this.tileSize = 20; // Default cell size in pixels, matches WorldMap.vue
    this.tiles = ref(this.initializeTiles());
  }

  update(context) {
    // console.log('MapManager update', context);
    // Logic to update map state (e.g., terrain changes, building placements)
  }

  getTileSize() {
    return this.tileSize;
  }

  getRandomTile() {
    const randomIndex = Math.floor(Math.random() * this.tiles.value.length);
    return this.tiles.value[randomIndex];
  }

  requestAvailableTiles(availableTileTypeList) {
    // Ensure tiles.value is an array and not empty before filtering
    if (!Array.isArray(this.tiles.value) || this.tiles.value.length === 0) {
      return [];
    }
    return this.tiles.value.filter(tile => tile && tile.isWalkable === true && tile.buildingId === null && availableTileTypeList.includes(tile.type));
  }

  initializeTiles() {
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
      return this.tiles.value[index];
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
    return this.tiles.value.find(tile => tile.id === tileId);
  }
}

export default MapManager;
