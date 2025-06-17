// src/core/shapes/Belonging.js
import { drawVehicles } from "./Vehicle";

export function drawCompanies(ctx, companies, tileSize) {
  if (!ctx || !companies || !tileSize || companies.length === 0) return;
  // draw company color
  companies.forEach(company => {
    ctx.fillStyle = company.color;
    ctx.fillRect(company.building.x * tileSize + tileSize / 4, company.building.y * tileSize + tileSize / 4, tileSize / 2, tileSize / 2);
    // drawVehicles(ctx, company.vehicles, tileSize);
  });
}
