import { faker } from "@faker-js/faker";
import CargoLoader from "@/core/actions/CargoLoader";
import CargoUnloader from "@/core/actions/CargoUnloader";
import Move from "@/core/models/Move"; // Assuming vehicles will also use the Move action

const VEHICLE_TYPES = ['Car', 'Bus', 'Truck', 'Motorcycle'];

class Vehicle {
  constructor(owner) {
    this.id = faker.string.uuid();
    this.type = VEHICLE_TYPES[Math.floor(Math.random() * VEHICLE_TYPES.length)];
    this.modelName = faker.vehicle.vehicle(); // e.g., 'Corvette', 'F-150'

    // Pixel coordinates - will be reactive if the Vehicle instance is reactive
    this.x = 0;
    this.y = 0;
    this.name = this.modelName;
    // Tile and Pathing
    this.currentTile = null; // Stores the Tile object vehicle is currently on
    this.actions = [];
    this.action = null;
    this.path = [];
    this.currentPathIndex = 0;
    this.targetTile = null; // Stores the target Tile object
    this.speed = 2; //faker.number.int({ min: 2, max: 5 }); // Speed in pixels per update tick. Adjust as needed.
    this.capacity = faker.number.int({ min: 1, max: 5 }); // Capacity of the vehicle
    this.stockings = [];
    this.carryingId = null;
    this.color = faker.color.rgb();
    if (owner) {
      this.owner = owner;
      this.ownerId = owner.id;
      this.relocate();
    }
  }

  relocate() {
    if (!this.owner) {
      return;
    }
    const location = this.owner.getLocation();
    if (!location) {
      return;
    }
    this.x = location.x;
    this.y = location.y;
  }

  // 送貨到某地後返回
  deliver(targetTile, returnTile) {
    this.actions.push(
      new CargoLoader(this),
      new Move(this, targetTile),
      new CargoUnloader(this),
      new Move(this, returnTile),
    );
  }

  loadCargo() {
    if (!this.currentTile) {
      return;
    }
    const stocking = this.currentTile.fetchStocking();
    if (!stocking) {
      return;
    }
    //console.log("Loading cargo:", stocking, "from tile:", this.currentTile);
    this.stockings.push(stocking);
    this.carryingId = stocking.id;
  }

  unloadCargo() {
    if (!this.stockings.length) {
      return;
    }
    const stocking = this.stockings.shift();
    if (!stocking) {
      return;
    }
    // console.log("Unloading cargo:", stocking, "to tile:", this.currentTile);
    stocking.carryBy(this.currentTile);
    this.currentTile.storeStocking(stocking);
    this.carryingId = null;
  }

  hasStockings() {
    return this.stockings.length > 0;
  }

  resetAction() {
    this.action = null;
  }

  update(context) {
    if (!this.action) {
      if (this.actions) {
        const action = this.actions.shift();
        this.action = action;
      }
    }
    this.action && this.action.update(context);
  }
}

export default Vehicle;
