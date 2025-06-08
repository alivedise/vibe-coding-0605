// src/core/shapes/Tile.js
export function drawTiles(ctx, tiles, tileSize) {
  if (!ctx || !tiles || !tileSize) return;

  tiles.forEach(tile => {
    // Base tile style
    ctx.fillStyle = '#f0f0f0'; // Light grass/default color
    ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
    ctx.strokeStyle = '#d0d0d0'; // Border for tiles
    ctx.strokeRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);

    // Example: if (tile.type === 'road') { ctx.fillStyle = '#888'; ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize); }
    // TODO: Add more sophisticated tile drawing based on tile.type (e.g., different colors/textures for 'road', 'water', 'grass')
  });
}
