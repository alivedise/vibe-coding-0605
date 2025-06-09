import { drawTiles } from "@/core/shapes/Tile";
import { drawBuildings } from "@/core/shapes/Building";
import { drawCitizens } from "@/core/shapes/Citizen";
import { drawVehicles } from "@/core/shapes/Vehicle";
import { drawStockings } from "@/core/shapes/Stocking";

class CanvasManager {
  constructor() {
    this.ctx = null;
    this.tileSize = 100; // Default tile size
    this.canvasElement = null;
    this.canvas = null;
    this.isRenderingGloballyEnabled = true; // Added flag
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
    if (!this.isRenderingGloballyEnabled) return; // Check the flag
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

    if (mapManager && mapManager.tiles) {
      drawTiles(this.ctx, mapManager.tiles, tileSize);
      if (context.configurationManager.DISPLAY_STOCKINGS) {
        drawStockings(this.ctx, mapManager.tiles, tileSize); // Draw stockings after tiles
      }
    }

    if (buildingManager && buildingManager.buildings) {
      drawBuildings(this.ctx, buildingManager.buildings, tileSize);
      if (context.configurationManager.DISPLAY_STOCKINGS) {
        drawStockings(this.ctx, buildingManager.buildings, tileSize);
      }
    }

    if (vehicleManager && vehicleManager.vehicles) {
      drawVehicles(this.ctx, vehicleManager.vehicles, tileSize);
    }

    if (citizenManager && citizenManager.citizens && citizenManager.citizens) {
      drawCitizens(this.ctx, citizenManager.citizens, tileSize, {
        drawMoney: context.configurationManager.DISPLAY_MONEY,
        drawAction: context.configurationManager.DISPLAY_ACTION,
        drawBelongingCount: context.configurationManager.DISPLA_BELONGING_COUNT,
      }); // citizens is a Map
    }

    // Add calls to other drawing methods (buildings, citizens, etc.) here
  }
}

export default CanvasManager;
