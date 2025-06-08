import { faker } from "@faker-js/faker";

class Building {
  constructor(id, type, x, y, width, height) {
    this.id = id || faker.string.uuid();
    this.type = type; // From BUILDING_TYPES
    this.x = x; // Top-left x-coordinate on the map grid
    this.y = y; // Top-left y-coordinate on the map grid
    this.width = width; // Width in grid cells
    this.height = height; // Height in grid cells
    this.companyId = null;
    // Add other properties like residents, jobs, companyId later
  }

  getDetails() {
    return {
      id: this.id,
      type: this.type,
      position: { x: this.x, y: this.y },
      size: { width: this.width, height: this.height },
    };
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
}

export default Building;
