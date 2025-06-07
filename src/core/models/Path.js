// src/core/models/Path.js
import { faker } from "@faker-js/faker";

class Path {
  /**
   * Represents a calculated path between two points on the map.
   * @param {number} startX - The x-coordinate of the starting tile.
   * @param {number} startY - The y-coordinate of the starting tile.
   * @param {number} endX - The x-coordinate of the ending tile.
   * @param {number} endY - The y-coordinate of the ending tile.
   */
  constructor(startX, startY, endX, endY) {
    this.id = faker.string.uuid(); // Unique ID for this path instance
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.points = this.constructPoints();
    this.createdAt = Date.now();
  }

  constructPoints() {
    // use interpolation to generate all points between start and end
    // if start is 10, 20 and end is 20, 20
    // the paths are [10, 20], [11, 20], [12, 20], [13, 20], [14, 20], [15, 20], [16, 20], [17, 20], [18, 20], [19, 20], [20, 20]
    const points = [];
    const startX = this.startX;
    const startY = this.startY;
    const endX = this.endX;
    const endY = this.endY;
    const steps = Math.max(Math.abs(endX - startX), Math.abs(endY - startY));
    for (let i = 0; i <= steps; i++) {
      const x = startX + (endX - startX) * (i / steps);
      const y = startY + (endY - startY) * (i / steps);
      points.push({ x, y });
    }
    return points;
  }
}

export default Path;
