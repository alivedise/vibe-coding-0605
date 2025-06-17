import { drawTiles } from "@/core/shapes/Tile";
import { drawBuildings } from "@/core/shapes/Building";
import { drawCitizens } from "@/core/shapes/Citizen";
import { drawVehicles } from "@/core/shapes/Vehicle";
import { drawStockings } from "@/core/shapes/Stocking";
import { drawFocus } from "@/core/shapes/focus";
import { drawCompanies } from "@/core/shapes/Company";

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

    const {
      focusManager,
      mapManager,
      citizenManager,
      buildingManager,
      vehicleManager,
      configurationManager,
      companyManager
    } = context;
    const focusObject = focusManager.focusedObject;
    const tileSize = mapManager.tileSize;

    this.clearCanvas();



    if (mapManager && mapManager.tiles) {
      // Tiles generally don't have individual focus IDs in the same way entities do, so not passing focus here.
      drawTiles(this.ctx, mapManager.tiles, tileSize);
      if (configurationManager.DISPLAY_STOCKINGS) {
        // Assuming stockings on tiles are not individually focusable in this context.
        drawStockings(this.ctx, mapManager.tiles, tileSize);
      }
    }

    if (buildingManager && buildingManager.buildings) {
      drawBuildings(this.ctx, buildingManager.buildings, tileSize);
      if (configurationManager.DISPLAY_STOCKINGS) {
        // Assuming stockings on buildings are not individually focusable in this context.
        drawStockings(this.ctx, buildingManager.buildings, tileSize);
      }
    }

    if (companyManager && companyManager.companies) {
      drawCompanies(this.ctx, companyManager.companies, tileSize);
    }

    if (vehicleManager && vehicleManager.vehicles) {
      drawVehicles(this.ctx, vehicleManager.vehicles, tileSize);
    }

    if (citizenManager && citizenManager.citizens) {
      drawCitizens(this.ctx, citizenManager.citizens, tileSize, {
        drawMoney: configurationManager.DISPLAY_MONEY,
        drawAction: configurationManager.DISPLAY_ACTION,
        drawBelongingCount: configurationManager.DISPLAY_BELONGING_COUNT, // Corrected typo from DISPLA_ to DISPLAY_
      }); // citizens is a Map
    }

    // Add calls to other drawing methods (buildings, citizens, etc.) here
    if (focusObject) {
      drawFocus(this.ctx, focusObject);
    }
  }
}

export default CanvasManager;
