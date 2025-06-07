import { computed, ref } from "vue";
import Citizen from "@/core/models/Citizen";
import { BUILDING_TYPES } from "@/constants/buildingTypes";

const MAX_CITIZENS_PER_RESIDENCE = 1; // Example capacity
const SPAWN_INTERVAL_TICKS = 5; // Attempt to spawn a citizen every 100 ticks

class CitizenManager {
  constructor() {
    console.log("CitizenManager initialized");
    this.citizens = ref([]);
    this.ticksSinceLastSpawnAttempt = 0;
  }

  update(context) {
    // console.log('CitizenManager update', context);
    this.ticksSinceLastSpawnAttempt++;

    if (this.ticksSinceLastSpawnAttempt >= SPAWN_INTERVAL_TICKS) {
      this.trySpawnCitizen(context);
      this.ticksSinceLastSpawnAttempt = 0;
    }

    // Logic to update citizen states (e.g., movement, actions, needs)
    this.citizens.value.forEach((citizen) => citizen.update(context));
  }

  addCitizen(citizen) {
    this.citizens.value.push(citizen);
    console.log(
      `Citizen ${citizen.name} added. Total citizens: ${this.citizens.value.length}`,
    );
  }

  trySpawnCitizen(context) {
    if (this.citizens.value.length >= 3) {
      console.log('Maximum citizens reached. Not spawning new citizen.');
      return;
    }
    const randomTile = context.mapManager.getRandomTile();
    if (!randomTile) {
      console.error('Failed to get random tile for citizen spawn.');
      return;
    }
    const newCitizen = new Citizen();
    newCitizen.currentTile = randomTile;
    newCitizen.x.value = randomTile.x * context.mapManager.cellSize + context.mapManager.cellSize / 2;
    newCitizen.y.value = randomTile.y * context.mapManager.cellSize + context.mapManager.cellSize / 2;
    this.addCitizen(newCitizen);
    console.log(`Spawned new citizen ${newCitizen.name} at (${randomTile.x}, ${randomTile.y})`);
  }

  // Add other methods for citizen behavior management, etc.
}

export default CitizenManager;
