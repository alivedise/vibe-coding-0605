import { ref, computed } from "vue";
import { BUILDING_TYPES, BUILDING_SIZES, ALLOWED_TERRAIN_FOR_BUILDING } from "@/constants/buildingTypes";
import Building from "@/core/models/Building";
import { faker } from "@faker-js/faker";

class BuildingManager {
  constructor() {
    console.log("BuildingManager initialized");
    this.buildings = ref([]);
    // Pass the mapManager (as part of a minimal context) to placeInitialBuildings
  }

  update(context) {
    this.context = context;
    // Logic to update building states (e.g., construction, upgrades)
    // create random buildings if possible.
    if (this.buildings.value.length < 3) {
      this.generateRandomBuilding();
    }
  }

  getRandomBuilding() {
    return this.buildings.value[Math.floor(Math.random() * this.buildings.value.length)];
  }

  createBuilding(context, type) {
    const sizeConfig = BUILDING_SIZES[type];
    const buildingWidth = faker.number.int({
      min: 1,
      max: 1,
    });
    const buildingHeight = faker.number.int({
      min: 1,
      max: 1,
    });

    // find possible tile from tileManager
    const possibleTiles = context.mapManager.requestAvailableTiles(ALLOWED_TERRAIN_FOR_BUILDING[type]);
    // console.log("Possible tiles for building placement:", possibleTiles);
    if (!possibleTiles || possibleTiles.length === 0) {
      console.warn("No available tiles for building placement.");
      return null;
    }
    const randomTile = possibleTiles[Math.floor(Math.random() * possibleTiles.length)];
    const randomX = randomTile.x;
    const randomY = randomTile.y;

    const newBuilding = new Building(
      faker.string.uuid(),
      type,
      randomX,
      randomY,
      buildingWidth,
      buildingHeight
    );
    console.log("Created building:", newBuilding.getDetails());
    return newBuilding;
  }

  addBuilding(building) {
    // 1. Check bounds
    if (
      building.x < 0 ||
      building.x + building.width > this.mapWidth ||
      building.y < 0 ||
      building.y + building.height > this.mapHeight
    ) {
      console.warn("Building out of bounds:", building.getDetails());
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
        console.warn(
          "Building collision detected:",
          building.getDetails(),
          "with",
          existingBuilding.getDetails()
        );
        return false; // Collision detected
      }
    }

    // 3. Check for valid terrain
    const allowedTerrains = ALLOWED_TERRAIN_FOR_BUILDING[building.type];
    if (allowedTerrains) {
      for (let y = building.y; y < building.y + building.height; y++) {
        for (let x = building.x; x < building.x + building.width; x++) {
          // Ensure mapData.value is accessed correctly, as it's a ref from MapManager
          // context parameter in addBuilding is the one passed from createBuilding or placeInitialBuildings
          // this.context is set by the GameStateManager.update loop
          const currentContext = this.context || context; 

          if (!currentContext || !currentContext.mapManager) {
            console.error("Context or mapManager is not available in addBuilding for terrain check");
            return false; // Cannot check terrain without context
          }
          const terrainCell = currentContext.mapManager.getTileAt(x, y);

          if (!terrainCell) {
            console.warn(`Building placement failed: No tile data at (${x},${y}) for building type '${building.type}'.`);
            return false; // Tile doesn't exist
          }

          if (!allowedTerrains.includes(terrainCell.type)) {
            console.warn(
              `Building placement failed: Invalid terrain '${terrainCell.type}' at (${x},${y}) for building type '${building.type}'. Allowed: ${allowedTerrains.join(", ")}`,
              building.getDetails()
            );
            return false; // Invalid terrain
          }
        }
      }
    } else {
      console.warn(
        `No terrain rules defined for building type: ${building.type}`
      );
      // Decide if this should prevent placement or not; for now, let's allow if no rules.
    }

    this.buildings.value.push(building);
    console.log("Building added:", building.getDetails());
    return true;
  }

  generateRandomBuilding() {
    const randomType =
      Object.values(BUILDING_TYPES)[
        Math.floor(Math.random() * Object.values(BUILDING_TYPES).length)
      ];
    console.log("Generating random building:", randomType);
    this.addBuilding(this.createBuilding(this.context, randomType));
  }
  
  getBuildingsByType(type) {
    return this.buildings.value.filter(building => building.type === type);
  }
}

export default BuildingManager;
