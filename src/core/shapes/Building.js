// src/core/shapes/Building.js
export function drawBuildings(ctx, buildings, tileSize) {
  if (!ctx || !buildings || !tileSize) return;

  buildings.forEach(building => {
    // Assuming building.getColor() exists and returns a valid color string
    // and building.x, building.y, building.width, building.height are in tile units
    let buildingColor = typeof building.getColor === 'function' ? building.getColor() : '#A9A9A9'; // Default to dark gray
    
    ctx.fillStyle = buildingColor;
    ctx.fillRect(
      building.x * tileSize,
      building.y * tileSize,
      (building.width || 1) * tileSize,
      (building.height || 1) * tileSize
    );
    ctx.strokeStyle = '#555'; // Darker border for buildings
    ctx.strokeRect(
      building.x * tileSize,
      building.y * tileSize,
      (building.width || 1) * tileSize,
      (building.height || 1) * tileSize
    );

    // Tiny detail (e.g., a door)
    ctx.fillStyle = '#5D6D7E';
    ctx.fillRect(
      building.x * tileSize + tileSize * 0.4,
      building.y * tileSize + (building.height || 1) * tileSize * 0.7,
      tileSize * 0.2,
      (building.height || 1) * tileSize * 0.3
    );
  });
}
