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

  updateTileSize(newTileSize) {
    this.tileSize = newTileSize;
  }

  clearCanvas() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawTiles(tiles, tileSize) {
    if (!this.ctx || !tiles || !tileSize) return;

    tiles.forEach(tile => {
      // Base tile style
      this.ctx.fillStyle = '#f0f0f0'; // Light grass/default color
      this.ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
      this.ctx.strokeStyle = '#d0d0d0'; // Border for tiles
      this.ctx.strokeRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);

      // Example: if (tile.type === 'road') { this.ctx.fillStyle = '#888'; this.ctx.fillRect(...); }
    });
  }

  // Placeholder for drawing buildings
  drawBuildings(buildings, tileSize) {
    if (!this.ctx || !buildings || !tileSize) return;
    // TODO: Implement building drawing logic
    buildings.forEach(building => {
      let buildingColor = building.getColor();
      this.ctx.fillStyle = buildingColor;
      this.ctx.fillRect(
        building.x * tileSize,
        building.y * tileSize,
        (building.width || 1) * tileSize, // Default to 1 tile width if not specified
        (building.height || 1) * tileSize // Default to 1 tile height
      );
      this.ctx.strokeStyle = '#555'; // Darker border for buildings
      this.ctx.strokeRect(
        building.x * tileSize,
        building.y * tileSize,
        (building.width || 1) * tileSize,
        (building.height || 1) * tileSize
      );

      // Tiny detail (e.g., a door)
      this.ctx.fillStyle = '#5D6D7E';
      this.ctx.fillRect(
        building.x * tileSize + tileSize * 0.4,
        building.y * tileSize + (building.height || 1) * tileSize * 0.7,
        tileSize * 0.2,
        (building.height || 1) * tileSize * 0.3
      );

  
      // draw stocking of the building
    });
  }

  // Placeholder for drawing citizens
  drawCitizens(citizensMap, tileSize) {
    if (!this.ctx || !citizensMap || !tileSize) return;
    // TODO: Implement citizen drawing logic
    citizensMap.forEach(citizen => {
      let citizenColor = citizen.getColor();
      const actionType = citizen.action?.name || 'Idle';

      // render additional label for action type
      this.ctx.fillStyle = actionType === 'Move' ? '#e67e22' : citizenColor;
      this.ctx.font = `${tileSize / 7}px Arial`;
      this.ctx.textAlign = 'right';
      this.ctx.textBaseline = 'bottom';

      // use fill color for citizen
      this.ctx.fillStyle = citizenColor;
      this.ctx.beginPath();
      const citizenRadius = 3;
      const centerX = citizen.x + citizenRadius; // Use actual x,y not center of tile
      const centerY = citizen.y + citizenRadius;
      this.ctx.arc(centerX, centerY, citizenRadius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.fillText(actionType, centerX, centerY);

      // Draw a small line for direction if moving
      if (actionType === 'Move' && citizen.action?.targetTile) {
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        const targetCenterX = citizen.action.targetTile.x * tileSize + tileSize / 2;
        const targetCenterY = citizen.currentAction.targetTile.y * tileSize + tileSize / 2;
        // Simple direction towards target center, not precise path
        let dx = targetCenterX - (citizen.x);
        let dy = targetCenterY - (citizen.y);
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > 0) {
            dx /= len;
            dy /= len;
            this.ctx.lineTo(centerX + dx * citizenRadius * 1.5, centerY + dy * citizenRadius * 1.5);
            this.ctx.stroke();
        }
        this.ctx.lineWidth = 1; // Reset line width
      }

      // Draw belongings
      this.drawBelongings(centerX, centerY, citizen.belongings, tileSize);
    });
  }

  // Placeholder for drawing vehicles
  drawVehicles(vehicles, tileSize) {
    if (!this.ctx || !vehicles || !tileSize) return;
    // TODO: Implement vehicle drawing logic
    vehicles.forEach(vehicle => {
      let vehicleColor = '#c0392b'; // Default red for vehicles
      // if (vehicle.type === 'truck') vehicleColor = '#7f8c8d'; // Example for different types
      this.ctx.fillStyle = vehicleColor;
      const vehicleWidth = tileSize * 0.6;
      const vehicleHeight = tileSize * 0.3;
      this.ctx.fillRect(
        vehicle.x - vehicleWidth / 2, // Center vehicle on its x,y
        vehicle.y - vehicleHeight / 2,
        vehicleWidth,
        vehicleHeight
      );

      if (vehicle.carryingId) {
        this.ctx.fillStyle = vehicle.stockings[0].getColor(); // Yellow for cargo
        this.ctx.fillRect(
          vehicle.x - vehicleWidth * 0.25, // Smaller rect on top
          vehicle.y - vehicleHeight * 0.25 - vehicleHeight * 0.2, // Positioned on top
          vehicleWidth * 0.5,
          vehicleHeight * 0.4
        );
      }
    });
  }

  drawBelongings(centerX, centerY, belongings, tileSize) {
    if (!this.ctx || !belongings || !tileSize) return;
    // draw belongings count on top of citizen
    this.ctx.fillStyle = 'black';
    this.ctx.font = `${tileSize / 7}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText(
      belongings.length.toString(),
      centerX + 5,
      centerY - 5
    );
  }

  // Placeholder for drawing stockings/products on tiles
  drawStockings(tiles, tileSize) {
    if (!this.ctx || !tiles || !tileSize) return;
    tiles.forEach(tile => {
      if (tile.stockings && tile.stockings.length > 0) {
        const stockingSize = tileSize / 8;
        const padding = tileSize / 10;
        tile.stockings.forEach((stocking, index) => {
          if (index > 10) {
            // Too much, ignore
            return;
          }
          // Simple stacking effect if multiple items
          const offsetX = (index % 3) * (stockingSize + padding);
          const offsetY = Math.floor(index / 3) * (stockingSize + padding);
          
          this.ctx.fillStyle = stocking.color || '#d35400'; // Default to a brownish color or use stocking's own color
          this.ctx.fillRect(
            tile.x * tileSize + padding + offsetX,
            tile.y * tileSize + padding + offsetY,
            stockingSize,
            stockingSize
          );
          this.ctx.strokeStyle = '#783f04';
          this.ctx.strokeRect(
            tile.x * tileSize + padding + offsetX,
            tile.y * tileSize + padding + offsetY,
            stockingSize,
            stockingSize
          );
        });

        // Draw stocking count
        if (tile.stockings.length > 0) {
          this.ctx.fillStyle = 'black';
          this.ctx.font = `${tileSize / 7}px Arial`;
          this.ctx.textAlign = 'right';
          this.ctx.textBaseline = 'bottom';
          this.ctx.fillText(
            tile.stockings.length.toString(),
            tile.x * tileSize + tileSize - padding / 2,
            tile.y * tileSize + tileSize - padding / 2
          );
        }
      }
    });
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
      if (this.tileSize !== mapManager.tileSize) {
        this.updateTileSize(mapManager.tileSize);
      }
      this.drawTiles(mapManager.tiles.value, this.tileSize);
      this.drawStockings(mapManager.tiles.value, this.tileSize); // Draw stockings after tiles
    }

    if (buildingManager && buildingManager.buildings && buildingManager.buildings.value) {
      this.drawBuildings(buildingManager.buildings.value, tileSize);
      this.drawStockings(buildingManager.buildings.value, tileSize);
    }

    if (vehicleManager && vehicleManager.vehicles && vehicleManager.vehicles.value) {
        this.drawVehicles(vehicleManager.vehicles.value, tileSize);
    }

    if (citizenManager && citizenManager.citizens && citizenManager.citizens.value) {
      this.drawCitizens(citizenManager.citizens.value, tileSize); // citizens is a Map
    }

    // Add calls to other drawing methods (buildings, citizens, etc.) here
  }
}

export default CanvasManager;
