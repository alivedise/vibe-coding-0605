export const BUILDING_TYPES = {
  RESIDENTIAL: "RESIDENTIAL",
  COMMERCIAL: "COMMERCIAL",
  INDUSTRIAL: "INDUSTRIAL",
};

export const BUILDING_COLORS = {
  [BUILDING_TYPES.RESIDENTIAL]: "purple",
  [BUILDING_TYPES.COMMERCIAL]: "orange",
  [BUILDING_TYPES.INDUSTRIAL]: "brown",
};

// Define default sizes or size ranges for buildings
export const BUILDING_SIZES = {
  [BUILDING_TYPES.RESIDENTIAL]: { min: 1, max: 2 }, // e.g., 1x1, 2x2
  [BUILDING_TYPES.COMMERCIAL]: { min: 1, max: 3 }, // e.g., 1x1, 2x2, 3x3
  [BUILDING_TYPES.INDUSTRIAL]: { min: 2, max: 3 }, // e.g., 2x2, 3x3
};

// Define which terrain types buildings can be placed on
export const ALLOWED_TERRAIN_FOR_BUILDING = {
  [BUILDING_TYPES.RESIDENTIAL]: ["GRASS", "SAND"],
  [BUILDING_TYPES.COMMERCIAL]: ["GRASS", "SAND"],
  [BUILDING_TYPES.INDUSTRIAL]: ["GRASS", "SAND"],
  // Add more specific rules if needed
};
