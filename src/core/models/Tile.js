// src/core/models/Tile.js

import Product from "./Product";

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
    this.stockings = [];
    this.lastSpawn = null;
  }

  update(context) {
    // spawn product for testing purpose in a 1 second interval
    if (!this.lastSpawn) {
      this.lastSpawn = context.currentTimestamp;
    }
    if (context.currentTimestamp - this.lastSpawn >= 1000) {
      this.spawnProduct(context);
      this.lastSpawn = context.currentTimestamp;
    }
  }

  spawnProduct(context) {
    const newProduct = new Product();
    context.productManager.registerProduct(newProduct);
    this.storeStocking(newProduct);
    // console.log(`Spawned new product ${newProduct.name} at tile (${this.x}, ${this.y})`);
  }

  fetchStocking() {
    if (this.building) {
      return this.building.fetchStocking();
    } else {
      return this.stockings.shift();
    }
  }

  storeStocking(stocking) {
    if (!stocking) {
      // console.error('No stocking provided to storeStocking method.');
      return;
    }
    if (!this.building) {
      // console.log(`Storing stocking ${stocking.name} at tile (${this.x}, ${this.y})`);
      this.stockings.push(stocking);
      return;
    }
    //console.log(`Storing stocking ${stocking.name} at tile (${this.x}, ${this.y}) to building ${this.building.id}`);
    this.building.storeStocking(stocking);
  }

  setBuilding(building) {
    this.buildingId = building.id;
    this.building = building;
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
    this.building = null;
  }

  get traversable() {
    return this.isWalkable;
  }
}
