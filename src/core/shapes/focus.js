export function drawFocus(ctx, focusedObject) {
  if (!ctx || !focusedObject) return;

  const { x, y } = focusedObject;

  // draw a tooltip at top of the object to display the object's details
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(x, y - 20, 100, 20);
  ctx.fillStyle = 'white';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(focusedObject.name, x + 50, y - 5);
}