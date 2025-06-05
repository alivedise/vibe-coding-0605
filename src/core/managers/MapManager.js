import { TERRAIN_TYPES, DEFAULT_MAP_WIDTH, DEFAULT_MAP_HEIGHT } from '@/constants/terrainTypes';
import { BUILDING_TYPES, BUILDING_SIZES, ALLOWED_TERRAIN_FOR_BUILDING } from '@/constants/buildingTypes';
import { ref, computed } from 'vue';
import Building from '@/core/models/Building';
import { faker } from '@faker-js/faker';

class MapManager {
    constructor(width = DEFAULT_MAP_WIDTH, height = DEFAULT_MAP_HEIGHT) {
        console.log('MapManager initialized');
        this.width = width;
        this.height = height;
        this.cellSize = 20; // Default cell size in pixels, matches WorldMap.vue
        this.mapData = ref(this.generateRandomMap());
        this.buildings = ref([]);
        this.placeInitialBuildings(5); // Place 5 random buildings for testing
    }

    update(context) {
        // console.log('MapManager update', context);
        // Logic to update map state (e.g., terrain changes, building placements)
    }

    mapGrid = computed(() => this.mapData.value);
    buildingList = computed(() => this.buildings.value);

    getData() {
        return computed(() => ({
            grid: this.mapGrid.value, // Access .value of the inner computed
            buildings: this.buildingList.value, // Access .value of the inner computed
            width: this.width,
            height: this.height,
            cellSize: this.cellSize,
            // citizens: this.citizenManager.citizensList.value // If we were to include citizens directly here
        }));
    }

    generateRandomMap() {
        const map = [];
        const terrainValues = Object.values(TERRAIN_TYPES);
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                // Simple random generation for now
                // PRD: "implement random map generator, able to generate diverse terrain according to set proportions"
                // This will be improved later.
                const randomTerrain = terrainValues[Math.floor(Math.random() * terrainValues.length)];
                row.push({ x, y, type: randomTerrain });
            }
            map.push(row);
        }
        console.log('Map generated:', map);
        return map;
    }

    // Add other methods for map modification, pathfinding, etc.

    addBuilding(building) {
        // 1. Check bounds
        if (
            building.x < 0 || building.x + building.width > this.width ||
            building.y < 0 || building.y + building.height > this.height
        ) {
            console.warn('Building out of bounds:', building.getDetails());
            return false;
        }

        // 2. Check for collision with existing buildings
        for (const existingBuilding of this.buildings.value) {
            if (
                building.x < existingBuilding.x + existingBuilding.width &&
                building.x + building.width > existingBuilding.x &&
                building.y < existingBuilding.y + existingBuilding.height &&
                building.y + building.height > existingBuilding.y
            ) {
                console.warn('Building collision detected:', building.getDetails(), 'with', existingBuilding.getDetails());
                return false; // Collision detected
            }
        }
        
        // 3. Check for valid terrain
        const allowedTerrains = ALLOWED_TERRAIN_FOR_BUILDING[building.type];
        if (allowedTerrains) {
            for (let y = building.y; y < building.y + building.height; y++) {
                for (let x = building.x; x < building.x + building.width; x++) {
                    const terrainCell = this.mapData.value[y][x]; // mapData is the grid itself
                    if (!allowedTerrains.includes(terrainCell.type)) {
                        console.warn(
                            `Building placement failed: Invalid terrain '${terrainCell.type}' at (${x},${y}) for building type '${building.type}'. Allowed: ${allowedTerrains.join(', ')}`,
                            building.getDetails()
                        );
                        return false; // Invalid terrain
                    }
                }
            }
        } else {
            console.warn(`No terrain rules defined for building type: ${building.type}`);
            // Decide if this should prevent placement or not; for now, let's allow if no rules.
            // return false; 
        }

        this.buildings.value.push(building);
        console.log('Building added:', building.getDetails());
        return true;
    }

    placeInitialBuildings(count) {
        const MAX_PLACEMENT_ATTEMPTS = 20;
        let residentialPlaced = 0;
        const targetResidential = Math.min(count, 2); // Aim for at least 2 residential, or 'count' if count is small

        // 1. Try to place residential buildings first
        for (let i = 0; i < targetResidential; i++) {
            let placed = false;
            for (let attempt = 0; attempt < MAX_PLACEMENT_ATTEMPTS; attempt++) {
                const type = BUILDING_TYPES.RESIDENTIAL;
                const sizeConfig = BUILDING_SIZES[type];
                const buildingWidth = faker.number.int({ min: sizeConfig.min, max: sizeConfig.max });
                const buildingHeight = faker.number.int({ min: sizeConfig.min, max: sizeConfig.max });

                const randomX = Math.floor(Math.random() * (this.width - buildingWidth + 1));
                const randomY = Math.floor(Math.random() * (this.height - buildingHeight + 1));

                const newBuilding = new Building(
                    faker.string.uuid(),
                    type,
                    randomX,
                    randomY,
                    buildingWidth,
                    buildingHeight
                );
                if (this.addBuilding(newBuilding)) {
                    residentialPlaced++;
                    placed = true;
                    break; // Successfully placed
                }
            }
            if (!placed) {
                console.warn(`Failed to place residential building ${i + 1} after ${MAX_PLACEMENT_ATTEMPTS} attempts.`);
            }
        }

        // 2. Place remaining buildings randomly (if count > residentialPlaced)
        const remainingCount = count - residentialPlaced;
        const buildingTypeValues = Object.values(BUILDING_TYPES);
        for (let i = 0; i < remainingCount; i++) {
            let placed = false;
            for (let attempt = 0; attempt < MAX_PLACEMENT_ATTEMPTS; attempt++) {
                const randomType = buildingTypeValues[Math.floor(Math.random() * buildingTypeValues.length)];
                const sizeConfig = BUILDING_SIZES[randomType];
                const buildingWidth = faker.number.int({ min: sizeConfig.min, max: sizeConfig.max });
                const buildingHeight = faker.number.int({ min: sizeConfig.min, max: sizeConfig.max });

                const randomX = Math.floor(Math.random() * (this.width - buildingWidth + 1));
                const randomY = Math.floor(Math.random() * (this.height - buildingHeight + 1));

                const newBuilding = new Building(
                    faker.string.uuid(),
                    randomType,
                    randomX,
                    randomY,
                    buildingWidth,
                    buildingHeight
                );
                if (this.addBuilding(newBuilding)) {
                    placed = true;
                    break; // Successfully placed
                }
            }
            if (!placed) {
                console.warn(`Failed to place random building type after ${MAX_PLACEMENT_ATTEMPTS} attempts.`);
            }
        }
        console.log(`Initial building placement: ${this.buildings.value.length} buildings placed.`);
    }
}



export default MapManager;
