// src/core/models/Tile.js

export class Tile {
  constructor(x, y, type = 'grass', isWalkable = true, terrainCost = 1, tileSize = 20) {
    this.id = `${x}_${y}`;
    this.x = x;
    this.y = y;
    this.type = type; // e.g., 'grass', 'road', 'water', 'building_foundation'
    this.isWalkable = isWalkable;
    this.terrainCost = terrainCost; // Cost for pathfinding
    this.buildingId = null; // ID of the building on this tile, if any
    this.isOccupied = false; // Generic flag if something (other than a building part of the tile type) is on it
    this.tileSize = tileSize;
  }

  setBuilding(buildingId) {
    this.buildingId = buildingId;
    this.isWalkable = false; // Typically, building tiles are not walkable directly
    this.type = 'building'; // Or a more specific building type if needed
  }

  getCenterPoint() {
    return {
      x: this.x * this.tileSize + this.tileSize / 2,
      y: this.y * this.tileSize + this.tileSize / 2,
    };
  }

  get hasBuilding() {
    return this.buildingId !== null;
  }

  clearBuilding() {
    this.buildingId = null;
    // Reset type and walkability based on underlying terrain or default
    // This might need more sophisticated handling if tiles can revert to a previous state
    this.type = 'grass'; // Default reversion
    this.isWalkable = true;
  }

  get traversable() {
    return this.isWalkable;
  }
}
