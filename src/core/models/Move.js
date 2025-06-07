import Pathfinder from "@/core/Pathfinder";

const PIXEL_MOVE_SPEED = 1; // Pixels per tick
const TARGET_REACH_EPSILON = 0.5; // How close to be to consider a pixel target reached

class Move {
  constructor(entity, initialBlockX, initialBlockY, tileSize) {
    this.entity = entity; // Reference to the owner (e.g., Citizen instance)

    // Logical grid position
    this.currentBlockX = initialBlockX;
    this.currentBlockY = initialBlockY;

    // Target pixel coordinates (center of nextStepBlock or finalDestinationBlock)
    this.targetPixelX = this.x.value; // Initially target current position
    this.targetPixelY = this.y.value;

    // Pathfinding properties
    this.finalDestinationBlockX = null;
    this.finalDestinationBlockY = null;
    this.nextStepBlockX = null; // The immediate next block in the path (logical block coords)
    this.nextStepBlockY = null;

    this.isMovingToFinalDestination = false;
    this.currentPath = []; // Stores the current path of logical block coordinates [{x, y}, ...]
  }

  update() {
    if (this.currentPath) {
      this.updateMovement();
    }
  }

  updateMovement() {
    if (this.currentPathIndex < this.currentPath.length) {
      if (!this.movePath(this.currentPath[this.currentPathIndex])) {
        this.currentPathIndex++;
      }
    } else {
      this.state = 'arrived';
      this.reference.terminateAction();
    }
  }

  movePath(pathStep) {
    if (this.patchIndicator < pathStep) {
      this.patchIndicator++;
    } else {
      return false;
    }
    this.reference.moveTo()
    return true;
  }

  setFinalDestination(finalX, finalY, context) {
    // console.log(`[Move SFD ${this.entity?.name}] Request to move to block: (${finalX}, ${finalY}) from block (${this.currentBlockX}, ${this.currentBlockY})`);

    if (this.currentBlockX === finalX && this.currentBlockY === finalY) {
      // console.log(`[Move SFD ${this.entity?.name}] Already at final destination block.`);
      this.isMovingToFinalDestination = false;
      this.currentPath = [];
      this.nextStepBlockX = null;
      this.nextStepBlockY = null;
      this.targetPixelX = (this.currentBlockX + 0.5) * this.tileSize;
      this.targetPixelY = (this.currentBlockY + 0.5) * this.tileSize;
      // Snap if not already there
      // this.x.value = this.targetPixelX;
      // this.y.value = this.targetPixelY;
      return;
    }

    if (!context || !context.map || !context.map.value) {
      console.warn(
        `[Move SFD ${this.entity?.name}] Map context not available. Cannot pathfind.`,
      );
      this.isMovingToFinalDestination = false;
      return;
    }

    this.finalDestinationBlockX = finalX;
    this.finalDestinationBlockY = finalY;

    const path = Pathfinder.findPath(
      this.currentBlockX,
      this.currentBlockY,
      finalX,
      finalY,
      context.map.value,
    );

    if (path && path.length > 0) {
      this.currentPath = path; // Path is [{x,y}, {x,y}, ...]
      this.currentPath.shift(); // Remove current location from path

      if (this.currentPath.length > 0) {
        this.isMovingToFinalDestination = true;
        // console.log(`[Move SFD ${this.entity?.name}] Path found to (${finalX}, ${finalY}). Path:`, JSON.stringify(this.currentPath.map(p => `(${p.x},${p.y})`)));
        this.determineNextStep(context);
      } else {
        // console.log(`[Move SFD ${this.entity?.name}] Path to (${finalX}, ${finalY}) is current location or empty. Assuming arrived.`);
        this.isMovingToFinalDestination = false;
        this.currentPath = [];
        this.nextStepBlockX = null;
        this.nextStepBlockY = null;
        this.targetPixelX = (this.finalDestinationBlockX + 0.5) * this.tileSize;
        this.targetPixelY = (this.finalDestinationBlockY + 0.5) * this.tileSize;
        this.x.value = this.targetPixelX; // Snap to destination's center
        this.y.value = this.targetPixelY;
        this.currentBlockX = this.finalDestinationBlockX;
        this.currentBlockY = this.finalDestinationBlockY;
      }
    } else {
      console.warn(
        `[Move SFD ${this.entity?.name}] No path found from (${this.currentBlockX}, ${this.currentBlockY}) to (${finalX}, ${finalY}). Halting.`,
      );
      this.isMovingToFinalDestination = false;
      this.currentPath = [];
      this.nextStepBlockX = null;
      this.nextStepBlockY = null;
      this.targetPixelX = (this.currentBlockX + 0.5) * this.tileSize;
      this.targetPixelY = (this.currentBlockY + 0.5) * this.tileSize;
    }
  }

  determineNextStep(context) {
    // console.log(`[Move DNS ${this.entity?.name}] Path at DNS start:`, JSON.stringify(this.currentPath?.map(p => `(${p.x},${p.y})`)));

    if (!this.isMovingToFinalDestination) {
      this.nextStepBlockX = null;
      this.nextStepBlockY = null;
      this.targetPixelX = (this.currentBlockX + 0.5) * this.tileSize;
      this.targetPixelY = (this.currentBlockY + 0.5) * this.tileSize;
      return;
    }

    if (this.currentPath && this.currentPath.length > 0) {
      const nextStepBlock = this.currentPath[0];
      this.nextStepBlockX = nextStepBlock.x;
      this.nextStepBlockY = nextStepBlock.y;
      this.targetPixelX = (this.nextStepBlockX + 0.5) * this.tileSize;
      this.targetPixelY = (this.nextStepBlockY + 0.5) * this.tileSize;
      // console.log(`[Move DNS ${this.entity?.name}] Setting nextStepBlock to: (${this.nextStepBlockX}, ${this.nextStepBlockY}), targetPixel: (${this.targetPixelX.toFixed(1)}, ${this.targetPixelY.toFixed(1)})`);
    } else {
      // console.log(`[Move DNS ${this.entity?.name}] Path exhausted. Current: (${this.currentBlockX}, ${this.currentBlockY}), Final: (${this.finalDestinationBlockX}, ${this.finalDestinationBlockY})`);
      if (
        this.currentBlockX === this.finalDestinationBlockX &&
        this.currentBlockY === this.finalDestinationBlockY
      ) {
        // console.log(`[Move DNS ${this.entity?.name}] Confirmed at final destination after path exhaustion.`);
        this.isMovingToFinalDestination = false;
      }
      this.nextStepBlockX = null;
      this.nextStepBlockY = null;
      this.targetPixelX = (this.currentBlockX + 0.5) * this.tileSize;
      this.targetPixelY = (this.currentBlockY + 0.5) * this.tileSize;
    }
  }

  _hasReachedPixelTarget() {
    return (
      Math.abs(this.x.value - this.targetPixelX) < TARGET_REACH_EPSILON &&
      Math.abs(this.y.value - this.targetPixelY) < TARGET_REACH_EPSILON
    );
  }

  updateMovement(context) {
    // console.log(`[Move update ${this.entity?.name}] PixelPos: (${this.x.value.toFixed(1)},${this.y.value.toFixed(1)}), TargetPixel: (${this.targetPixelX.toFixed(1)},${this.targetPixelY.toFixed(1)}), Block: (${this.currentBlockX},${this.currentBlockY}), NextBlock: (${this.nextStepBlockX},${this.nextStepBlockY}), FinalBlock: (${this.finalDestinationBlockX},${this.finalDestinationBlockY}), Moving: ${this.isMovingToFinalDestination})`);

    if (!this.isMovingToFinalDestination && this._hasReachedPixelTarget()) {
      // Not actively pathing and already at the target pixel (e.g. center of current block)
      // Snap to exact target if not already perfectly there, then do nothing else.
      if (this.x.value !== this.targetPixelX) this.x.value = this.targetPixelX;
      if (this.y.value !== this.targetPixelY) this.y.value = this.targetPixelY;
      return;
    }

    // Move towards targetPixelX/Y
    const diffX = this.targetPixelX - this.x.value;
    const diffY = this.targetPixelY - this.y.value;
    const distanceToTarget = Math.sqrt(diffX * diffX + diffY * diffY);

    if (distanceToTarget > TARGET_REACH_EPSILON) {
      const moveX = (diffX / distanceToTarget) * PIXEL_MOVE_SPEED;
      const moveY = (diffY / distanceToTarget) * PIXEL_MOVE_SPEED;

      this.x.value += moveX;
      this.y.value += moveY;
    } else {
      // Reached current targetPixel (center of nextStepBlock or finalDestinationBlock)
      this.x.value = this.targetPixelX; // Snap to target
      this.y.value = this.targetPixelY;

      if (
        this.nextStepBlockX !== null &&
        this.nextStepBlockY !== null &&
        this.currentBlockX === this.nextStepBlockX &&
        this.currentBlockY === this.nextStepBlockY
      ) {
        // This case should not happen if logic is correct, currentBlock should update *after* reaching nextStep's center
        // console.warn(`[Move update ${this.entity?.name}] Already at nextStepBlock logically before pixel arrival processing?`);
      }

      // Update logical current block to where we just arrived (the next step)
      if (this.nextStepBlockX !== null && this.nextStepBlockY !== null) {
        this.currentBlockX = this.nextStepBlockX;
        this.currentBlockY = this.nextStepBlockY;
        // console.log(`[Move update ${this.entity?.name}] Arrived at nextStepBlock: (${this.currentBlockX}, ${this.currentBlockY})`);
      }

      // Check if this arrival was the final destination
      if (
        this.currentBlockX === this.finalDestinationBlockX &&
        this.currentBlockY === this.finalDestinationBlockY
      ) {
        // console.log(`[Move update ${this.entity?.name}] Arrived at FINAL destination: (${this.finalDestinationBlockX}, ${this.finalDestinationBlockY})`);
        this.isMovingToFinalDestination = false;
        this.finalDestinationBlockX = null;
        this.finalDestinationBlockY = null;
        this.nextStepBlockX = null;
        this.nextStepBlockY = null;
        this.currentPath = [];
        // Target remains center of current (final) block
        this.targetPixelX = (this.currentBlockX + 0.5) * this.tileSize;
        this.targetPixelY = (this.currentBlockY + 0.5) * this.tileSize;
      } else if (this.isMovingToFinalDestination) {
        // Arrived at an intermediate step, advance path
        if (this.currentPath.length > 0) {
          this.currentPath.shift(); // Consume the step we just reached
          // console.log(`[Move update ${this.entity?.name}] Advanced path. Remaining:`, JSON.stringify(this.currentPath.map(p => `(${p.x},${p.y})`)));
        }
        this.determineNextStep(context); // Determine new nextStepBlock and targetPixel
      } else {
        // Not moving to a final destination, but reached a target pixel (e.g. initial snap or post-move adjustment)
        // Ensure nextStep is cleared if we are not actively pathing.
        this.nextStepBlockX = null;
        this.nextStepBlockY = null;
      }
    }
  }
}

export default Move;
