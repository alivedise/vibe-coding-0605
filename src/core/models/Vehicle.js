import { faker } from "@faker-js/faker";

import Move from "@/core/models/Move"; // Assuming vehicles will also use the Move action

const VEHICLE_TYPES = ['Car', 'Bus', 'Truck', 'Motorcycle'];

class Vehicle {
  constructor() {
    this.id = faker.string.uuid();
    this.type = VEHICLE_TYPES[Math.floor(Math.random() * VEHICLE_TYPES.length)];
    this.modelName = faker.vehicle.vehicle(); // e.g., 'Corvette', 'F-150'

    // Pixel coordinates - will be reactive if the Vehicle instance is reactive
    this.x = 0;
    this.y = 0;

    // Tile and Pathing
    this.currentTile = null; // Stores the Tile object vehicle is currently on
    this.action = null;
    this.path = [];
    this.currentPathIndex = 0;
    this.targetTile = null; // Stores the target Tile object
    this.speed = faker.number.int({ min: 2, max: 5 }); // Speed in pixels per update tick. Adjust as needed.
    this.capacity = faker.number.int({ min: 1, max: 5 }); // Capacity of the vehicle
    this.stockings = [];
  }

  loadCargo() {
    const stocking = this.currentTile.fetchCargo();
    if (!stocking) {
      return;
    }
    this.stockings.push(stocking);
  }

  unloadCargo() {
    if (!this.stockings.length) {
      return;
    }
    const stocking = this.stockings.shift();
    if (!stocking) {
      return;
    }
    this.currentTile.storeCargo(stocking);
  }

  getInfo() {
    return (
      `ID: ${this.id}, Type: ${this.type}, Model: ${this.modelName}, ` +
      `Pos: (${this.x.toFixed(1)}, ${this.y.toFixed(1)}), Speed: ${this.speed}`
    );
  }

  resetAction() {
    this.action = null;
  }

  beforeMove(context) {
    this.unloadCargo();
  }

  afterMove(context) {
    this.loadCargo();
  }

  update(context) {
    if (!this.action) {
      this.action = new Move(this);
    }
    this.action.update(context);
  }
}

export default Vehicle;
