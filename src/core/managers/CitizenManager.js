import { ref, markRaw } from "vue";
import Citizen from "@/core/models/Citizen";

const MAX_CITIZENS = 30; // Example capacity
const SPAWN_INTERVAL_TICKS = 5; // Attempt to spawn a citizen every 100 ticks

class CitizenManager {
  constructor() {
    console.log("CitizenManager initialized");
    this.citizens = ref(new Map());
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
    this.citizens.value.forEach((citizen) => citizen.update(context)); // Iterating map values is fine
  }

  addCitizen(citizen) {
    this.citizens.value.set(citizen.id, citizen);
    console.log(
      `Citizen ${citizen.name} added. Total citizens: ${this.citizens.value.size}`,
    );
  }

  triggerRef(citizen) { // The 'citizen' argument is no longer strictly needed here but kept for signature consistency if called from Citizen.js
    // Create a new Map instance to trigger reactivity
    this.citizens.value = new Map(this.citizens.value);
    // console.log('CitizenManager triggerRef called, new citizens map instance created.');
  }

  trySpawnCitizen(context) {
    if (this.citizens.value.size >= MAX_CITIZENS) {
      // console.log('Maximum citizens reached. Not spawning new citizen.');
      return;
    }
    const randomTile = context.mapManager.getRandomTile();
    if (!randomTile) {
      // console.error('Failed to get random tile for citizen spawn.');
      return;
    }
    const newCitizen = markRaw(new Citizen(this));
    this.addCitizen(newCitizen);
    // console.log(`Spawned new citizen ${newCitizen.name} at (${randomTile.x}, ${randomTile.y})`);
  }

  // Add other methods for citizen behavior management, etc.
}

export default CitizenManager;
