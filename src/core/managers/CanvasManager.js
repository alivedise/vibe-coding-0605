import { drawTiles } from "@/core/shapes/Tile";
import { drawBuildings } from "@/core/shapes/Building";
import { drawCitizens } from "@/core/shapes/Citizen";
import { drawVehicles } from "@/core/shapes/Vehicle";
import { drawStockings } from "@/core/shapes/Stocking";
import { drawBelongings } from "@/core/shapes/Belonging";

class CanvasManager {
  constructor() {
    this.ctx = null;
    this.tileSize = 100; // Default tile size
    this.canvasElement = null;
    this.canvas = null;
    console.log('CanvasManager initialized');
  }

  feedCanvas(element) {
    this.canvasElement = element;
    this.canvas = this.canvasElement;
    this.ctx = this.canvas.getContext('2d');
  }

  update(context) {
    this.draw(context);
  }

  clearCanvas() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Main drawing method to be called on each game tick.
   * @param {Object} gameState - The current game state, containing all managers.
   */
  draw(context) {
    if (!this.ctx || !context) {
      // console.warn('CanvasManager: Context or gameState not available for drawing.');
      return;
    }
  
    const tileSize = context.mapManager.tileSize;

    this.clearCanvas();

    const mapManager = context.mapManager;
    const citizenManager = context.citizenManager;
    const buildingManager = context.buildingManager;
    const vehicleManager = context.vehicleManager;

    if (mapManager && mapManager.tiles && mapManager.tiles.value) {
      drawTiles(this.ctx, mapManager.tiles.value, tileSize);
      drawStockings(this.ctx, mapManager.tiles.value, tileSize); // Draw stockings after tiles
    }

    if (buildingManager && buildingManager.buildings && buildingManager.buildings.value) {
      drawBuildings(this.ctx, buildingManager.buildings.value, tileSize);
      drawStockings(this.ctx, buildingManager.buildings.value, tileSize);
    }

    if (vehicleManager && vehicleManager.vehicles && vehicleManager.vehicles.value) {
      drawVehicles(this.ctx, vehicleManager.vehicles.value, tileSize);
    }

    if (citizenManager && citizenManager.citizens && citizenManager.citizens.value) {
      drawCitizens(this.ctx, citizenManager.citizens.value, tileSize); // citizens is a Map
    }

    // Add calls to other drawing methods (buildings, citizens, etc.) here
  }
}

export default CanvasManager;
