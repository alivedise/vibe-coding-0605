import Vehicle from "@/core/models/Vehicle";
import { ref, markRaw } from "vue";

class VehicleManager {
  constructor() {
    this.vehicles = ref([]);
  }

  update(context) {
    this.vehicles.value.forEach((vehicle) => vehicle.update(context));
    if (this.vehicles.value.length < 5) {
      this.trySpawnVehicle(context);
    }
  }

  requestAvailableVehicle() {
    return this.vehicles.value.find((vehicle) => vehicle.capacity > 0);
  }

  trySpawnVehicle(context) {
    const randomTile = context.mapManager.getRandomTile();
    if (!randomTile) {
      // console.error('Failed to get random tile for citizen spawn.');
      return;
    }
    const newVehicle = markRaw(new Vehicle());
    this.vehicles.value.push(newVehicle);
    console.log(`Spawned new vehicle at (${randomTile.x}, ${randomTile.y})`);
  }

  // Add other methods for citizen behavior management, etc.
}

export default VehicleManager;
