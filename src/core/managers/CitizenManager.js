import { ref, markRaw } from "vue";
import Citizen from "@/core/models/Citizen";

const MAX_CITIZENS = 30; // Example capacity
const SPAWN_INTERVAL_TICKS = 5; // Attempt to spawn a citizen every 100 ticks

class CitizenManager {
  constructor() {
    console.log("CitizenManager initialized");
    this.citizens = []; // Changed from Map to Array
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
    this.citizens.forEach((citizen) => citizen.update(context)); // Iterating array is fine
  }

  addCitizen(citizen) {
    this.citizens.push(citizen);
    console.log(
      `Citizen ${citizen.name} added. Total citizens: ${this.citizens.length}`,
    );
  }

  trySpawnCitizen(context) {
    if (this.citizens.length >= MAX_CITIZENS) {
      // console.log('Maximum citizens reached. Not spawning new citizen.');
      return;
    }
    const randomTile = context.mapManager.getRandomTile();
    if (!randomTile) {
      // console.error('Failed to get random tile for citizen spawn.');
      return;
    }
    const newCitizen = markRaw(new Citizen());
    this.addCitizen(newCitizen);
    // console.log(`Spawned new citizen ${newCitizen.name} at (${randomTile.x}, ${randomTile.y})`);
  }

  // Add other methods for citizen behavior management, etc.
}

export default CitizenManager;
