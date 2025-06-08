// src/core/shapes/Stocking.js
export function drawStockings(ctx, tiles, tileSize) {
  if (!ctx || !tiles || !tileSize) return;

  tiles.forEach(tile => {
    if (tile.stockings && tile.stockings.length > 0) {
      const maxStockingsToDraw = 9; // Max items to draw per tile (e.g., 3x3 grid)
      const numCols = 3; // Number of columns for arranging stockings on a tile

      const baseStockingSize = Math.max(3, tileSize / 9); // Min size 3px, scaled with tile size
      const padding = Math.max(1, tileSize / 25);    // Min padding 1px, scaled

      tile.stockings.slice(0, maxStockingsToDraw).forEach((stocking, index) => {
        const col = index % numCols;
        const row = Math.floor(index / numCols);

        const offsetX = col * (baseStockingSize + padding);
        const offsetY = row * (baseStockingSize + padding);
        
        const stockingColor = stocking.color || (typeof stocking.getColor === 'function' ? stocking.getColor() : '#d35400'); // Default color
        ctx.fillStyle = stockingColor;
        
        ctx.fillRect(
          tile.x * tileSize + padding + offsetX,
          tile.y * tileSize + padding + offsetY,
          baseStockingSize,
          baseStockingSize
        );
        
        // Optional: Add a border to stockings for better definition
        ctx.strokeStyle = '#783f04'; // Darker border color
        ctx.lineWidth = Math.max(1, tileSize / 100); // Scaled line width with a minimum
        ctx.strokeRect(
          tile.x * tileSize + padding + offsetX,
          tile.y * tileSize + padding + offsetY,
          baseStockingSize,
          baseStockingSize
        );
        ctx.lineWidth = 1; // Reset line width for other drawing operations
      });

      
      // Draw stocking count text
      if (tile.stockings.length > 0) {
        ctx.fillStyle = 'black';
        const fontSize = Math.max(10, tileSize / 7); // Ensure font size is readable
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        // Position count at the bottom-right of the tile
        ctx.fillText(
          tile.stockings.length.toString(),
          tile.x * tileSize + tileSize - (padding / 2) - 2, // Small offset from edge
          tile.y * tileSize + tileSize - (padding / 2) - 2  // Small offset from edge
        );
      }
    }
  });
}
