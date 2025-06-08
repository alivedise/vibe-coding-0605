import { faker } from "@faker-js/faker";
import { BUILDING_COLORS } from "@/constants/buildingTypes";

class Building {
  constructor(id, type, x, y, width, height) {
    this.id = id || faker.string.uuid();
    this.type = type; // From BUILDING_TYPES
    this.x = x; // Top-left x-coordinate on the map grid
    this.y = y; // Top-left y-coordinate on the map grid
    this.tile = null;
    this.tileId = null;
    this.tiles = []; // prepare for multiple tiles
    this.width = width; // Width in grid cells
    this.height = height; // Height in grid cells
    this.companyId = null;
    this.stockings = [];
    // Add other properties like residents, jobs, companyId later
  }

  update(context) {
    
  }

  getColor() {
    return BUILDING_COLORS[this.type];
  }

  getDetails() {
    return {
      id: this.id,
      type: this.type,
      position: { x: this.x, y: this.y },
      size: { width: this.width, height: this.height },
    };
  }

  setTile(tile) {
    this.tile = tile;
    this.tile.setBuilding(this);
    this.tileId = tile.id;
    this.tiles.push(tile);
  }

  // Method to check if a point (px, py) is within this building's footprint
  contains(px, py) {
    return (
      px >= this.x &&
      px < this.x + this.width &&
      py >= this.y &&
      py < this.y + this.height
    );
  }

  fetchStocking() {
    return this.stockings.shift();
  }

  storeStocking(stocking) {
    if (!stocking) {
      return;
    }
    this.stockings.push(stocking);
  }

  setCompany(company) {
    this.companyId = company.id;
    this.company = company;
  }
}

export default Building;
