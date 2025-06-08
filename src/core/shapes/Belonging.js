// src/core/shapes/Belonging.js
export function drawBelongings(ctx, centerX, centerY, belongings, tileSize) {
  if (!ctx || !belongings || !tileSize || belongings.length === 0) return;

  // Draw belongings count near the citizen
  ctx.fillStyle = 'black';
  const fontSize = Math.max(8, tileSize / 9); // Dynamic font size with a minimum
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle'; // Adjust for better vertical centering
  
  // Position the count slightly offset from the citizen's center
  // Consider citizenRadius if available for more precise offset relative to citizen's visual edge
  ctx.fillText(
    belongings.length.toString(),
    centerX + (tileSize / 10), // Offset to the right
    centerY - (tileSize / 10)  // Offset upwards
  );
}
