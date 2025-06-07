export const TERRAIN_TYPES = {
  GRASS: { name: "GRASS", isWalkable: true, terrainCost: 1, color: "green" },
  SAND: { name: "SAND", isWalkable: true, terrainCost: 2, color: "yellow" },
  WATER: { name: "WATER", isWalkable: false, terrainCost: 100, color: "blue" }, // Typically not walkable
  MOUNTAIN: { name: "MOUNTAIN", isWalkable: false, terrainCost: 50, color: "gray" }, // Or high cost if walkable
  ROAD: { name: "ROAD", isWalkable: true, terrainCost: 0.5, color: "darkgray" },
  BUILDING: { name: "BUILDING", isWalkable: false, terrainCost: Infinity, color: "#505050" } // For tiles occupied by buildings
};

export const TERRAIN_COLORS = {
  [TERRAIN_TYPES.GRASS.name]: TERRAIN_TYPES.GRASS.color,
  [TERRAIN_TYPES.SAND.name]: TERRAIN_TYPES.SAND.color,
  [TERRAIN_TYPES.WATER.name]: TERRAIN_TYPES.WATER.color,
  [TERRAIN_TYPES.MOUNTAIN.name]: TERRAIN_TYPES.MOUNTAIN.color,
  [TERRAIN_TYPES.ROAD.name]: TERRAIN_TYPES.ROAD.color,
  [TERRAIN_TYPES.BUILDING.name]: TERRAIN_TYPES.BUILDING.color
};

export const DEFAULT_MAP_WIDTH = 6;
export const DEFAULT_MAP_HEIGHT = 5;
