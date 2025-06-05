import { computed, ref } from 'vue';
import Citizen from '@/core/models/Citizen';
import { BUILDING_TYPES } from '@/constants/buildingTypes';
import { faker } from '@faker-js/faker'; // For generating citizen data if not provided

const MAX_CITIZENS_PER_RESIDENCE = 5; // Example capacity
const SPAWN_INTERVAL_TICKS = 5; // Attempt to spawn a citizen every 100 ticks

class CitizenManager {
    constructor() {
        console.log('CitizenManager initialized');
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
        this.citizens.value.forEach(citizen => citizen.update(context));
    }

    citizensList = computed(() => this.citizens.value);

    getData() {
        return this.citizensList; // Return full citizen objects for now
        // return this.citizens.map(c => c.getInfo ? c.getInfo() : c);
    }

    addCitizen(citizen) {
        this.citizens.value.push(citizen);
        console.log(`Citizen ${citizen.name} added. Total citizens: ${this.citizens.value.length}`);
    }

    trySpawnCitizen(context) {
        if (!context || !context.map || !context.map.value || !context.map.value.buildings) {
            // console.warn('Cannot spawn citizen: Map data or buildings not available in context.');
            return;
        }

        const residentialBuildings = context.map.value.buildings.filter(
            b => b.type === BUILDING_TYPES.RESIDENTIAL
        );

        if (residentialBuildings.length === 0) {
            // console.log('No residential buildings available to spawn citizens.');
            return;
        }

        for (const building of residentialBuildings) {
            const residentsInBuilding = this.citizens.value.filter(c => c.homeBuildingId === building.id).length;
            if (residentsInBuilding < MAX_CITIZENS_PER_RESIDENCE * building.width * building.height) { // Capacity based on size
                const newCitizen = new Citizen(); // Uses faker for random data
                newCitizen.homeBuildingId = building.id;
                // Place citizen at the building's top-left corner for now
                // Could be randomized within the building or at an entrance point later
                newCitizen.setPosition(building.x, building.y);
                this.addCitizen(newCitizen);
                console.log(`Spawned new citizen ${newCitizen.name} in building ${building.id}`);
                return; // Spawn one citizen per attempt for now
            }
        }
        // console.log('All residential buildings are at capacity.');
    }

    // Add other methods for citizen behavior management, etc.
}


export default CitizenManager;
