import Vehicle from "@/core/models/Vehicle";
import { shallowReactive } from "vue";

class VehicleManager {
  constructor() {
    this.vehicles = [];
  }

  update(context) {
    this.vehicles.forEach((vehicle) => vehicle.update(context));
    if (this.vehicles.length < 5) {
      this.trySpawnVehicle(context);
    }
  }

  requestAvailableVehicle() {
    return this.vehicles.find((vehicle) => vehicle.capacity > 0);
  }

  trySpawnVehicle(context) {
    const randomTile = context.mapManager.getRandomTile();
    if (!randomTile) {
      // console.error('Failed to get random tile for citizen spawn.');
      return;
    }
    const newVehicle = new Vehicle();
    this.vehicles.push(newVehicle);
    console.log(`Spawned new vehicle at (${randomTile.x}, ${randomTile.y})`);
  }

  // Add other methods for citizen behavior management, etc.
}

export default VehicleManager;
