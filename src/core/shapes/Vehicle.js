// src/core/shapes/Vehicle.js

export function drawVehicles(ctx, vehicles, tileSize, displayVehicleOwnerId = false) {
  if (!ctx || !vehicles || !tileSize) return;

  vehicles.forEach(vehicle => {
    const pixelX = vehicle.x;
    const pixelY = vehicle.y;

    let vehicleColor = vehicle.color;
    // TODO: Add more vehicle types and corresponding colors or sprites

    ctx.fillStyle = vehicleColor;
    const vehicleWidth = Math.min(tileSize * 0.6, 30);
    const vehicleHeight = Math.min(tileSize * 0.3, 20);
    
    ctx.fillRect(
      pixelX - vehicleWidth / 2,
      pixelY - vehicleHeight / 2,
      vehicleWidth,
      vehicleHeight
    );

    // Draw cargo if present
    if (vehicle.stockings && vehicle.stockings.length > 0) {
      const cargo = vehicle.stockings[0];
      const cargoColor = (typeof cargo.getColor === 'function' ? cargo.getColor() : (cargo.color || '#f1c40f')); // Default yellow for cargo
      ctx.fillStyle = cargoColor;
      
      const cargoDisplayWidth = vehicleWidth * 0.5;
      const cargoDisplayHeight = vehicleHeight * 0.4;
      
      ctx.fillRect(
        pixelX - cargoDisplayWidth / 2, // Center cargo on vehicle's x
        pixelY - vehicleHeight / 2 - cargoDisplayHeight * 0.75, // Position on top of the vehicle body
        cargoDisplayWidth,
        cargoDisplayHeight
      );

      if (displayVehicleOwnerId) {
        // draw owner color in border
        ctx.strokeStyle = vehicle.owner?.color;
        ctx.strokeRect(
          pixelX - cargoDisplayWidth / 2, // Center cargo on vehicle's x
          pixelY - vehicleHeight / 2 - cargoDisplayHeight * 0.75, // Position on top of the vehicle body
          cargoDisplayWidth,
          cargoDisplayHeight
        );
        // render owner id
        ctx.fillStyle = vehicle.owner?.color;
        ctx.font = `10px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(vehicle.owner?.id, pixelX, pixelY - cargoDisplayHeight - 2); // Position text above the cargo
      }
    }
  });
}
