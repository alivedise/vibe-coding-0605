class Move {
  constructor(object, targetTile) {
    this.object = object;
    if (targetTile) {
      this.targetTile = targetTile;
    } else {
      console.warn(`Object ${this.object.id} has no target tile.`);
    }
  }

  name = "Move";

  update(context) {
    this.move(context);
  }

  move(context) {
    // Ensure citizen has a current tile. If not, try to place them or log error.
    if (!this.object.currentTile) {
      console.warn(`Object ${this.object.id} has no current tile.`);
      this.object.currentTile = context.mapManager.getRandomTile();
      return;
    }
    if (!this.object.targetTile) {
      if (this.targetTile) {
        this.object.targetTile = this.targetTile;
      }
      if (this.object.targetTile?.id === this.object.currentTile.id) {
        this.object.targetTile = null;
        return;
      }
      return;
    }
    if (!this.object.path?.length) {
      this.object.path = context.pathManager.findPath(this.object.currentTile.id, this.object.targetTile.id);
      this.speedIndicator = 0;
      //console.log(`Citizen ${this.id} found path:`, this.path);
      return;
    }
    if (this.object.currentPathIndex >= this.object.path.length) {
      this.object.currentPathIndex = 0;
      this.object.path = [];
      this.object.currentTile = this.object.targetTile;
      this.object.targetTile = null;
      this.object.resetAction();
      return;
    }
    const point = this.object.path[this.object.currentPathIndex];
    this.object.x = point.x;
    this.object.y = point.y;
    // move reference this.object.speed
    this.object.currentPathIndex += this.object.speed;
  }

  decideWhereToGo(context) {
    const randomTarget = context.mapManager.getRandomTile();
    if (!randomTarget) {
      // console.warn(`Citizen ${this.id} could not find a random tile to target.`);
      this.object.targetTile = null;
      this.object.path = [];
      return;
    }
    this.object.targetTile = randomTarget;
  }
}

export default Move;
