// src/core/shapes/Citizen.js
import { drawBelongings } from './Belonging.js';

export function drawCitizens(ctx, citizensMap, tileSize, {
  drawMoney = false,
  drawAction = false,
  drawBelongingCount = false,
}) {
  if (!ctx || !citizensMap || !tileSize) return;

  citizensMap.forEach(citizen => {
    let citizenColor = typeof citizen.getColor === 'function' ? citizen.getColor() : '#3498db'; // Default blue
    const actionType = citizen.action?.name || 'Idle';
    
    const pixelX = citizen.x;
    const pixelY = citizen.y;

    const citizenRadius = Math.max(3, tileSize / 15);

    if (drawAction) {
      // Draw action type label
      ctx.fillStyle = actionType === 'Move' ? '#e67e22' : (typeof citizen.getColor === 'function' ? citizen.getColor() : citizenColor);
      const fontSize = Math.max(10, tileSize / 8);
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(actionType, pixelX, pixelY - citizenRadius - 2); // Position text above the citizen circle
    }

    // Draw citizen body
    ctx.fillStyle = citizenColor;
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, citizenRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Draw direction line if moving
    if (actionType === 'Move' && citizen.action?.targetTile) {
      ctx.strokeStyle = '#2c3e50';
      ctx.lineWidth = Math.max(1, tileSize / 50);
      ctx.beginPath();
      
      const targetPixelX = citizen.action.targetTile.x * tileSize + tileSize / 2;
      const targetPixelY = citizen.action.targetTile.y * tileSize + tileSize / 2;
      
      let dx = targetPixelX - pixelX;
      let dy = targetPixelY - pixelY;
      const len = Math.sqrt(dx * dx + dy * dy);
      
      if (len > 0) {
          dx /= len;
          dy /= len;
          const lineStartX = pixelX + dx * citizenRadius;
          const lineStartY = pixelY + dy * citizenRadius;
          const lineEndX = pixelX + dx * (citizenRadius + Math.max(5, tileSize / 10)); // Make line extend beyond radius
          const lineEndY = pixelY + dy * (citizenRadius + Math.max(5, tileSize / 10));
          ctx.moveTo(lineStartX, lineStartY);
          ctx.lineTo(lineEndX, lineEndY);
          ctx.stroke();
      }
      ctx.lineWidth = 1; // Reset line width
    }

    if (drawMoney) {
      // Draw money
      ctx.fillStyle = 'gold';
      const fontSizeMoney = Math.max(10, tileSize / 8);
      ctx.font = `${fontSizeMoney}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(citizen.money, pixelX, pixelY + citizenRadius + 15); // Position text below the citizen circle
    }
    if (drawBelongingCount) {
      drawBelongings(ctx, pixelX, pixelY, citizen.belongings, tileSize);
    }
  });
}
