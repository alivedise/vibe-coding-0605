<template>
  <div class="world-map-container">
    <div
      v-if="gameStateManager && gameStateManager.mapManager && gameStateManager.mapManager.tiles && gameStateManager.mapManager.tiles.value && gameStateManager.mapManager.tiles.value.length"
      class="world-map-grid"
    >
      <div
        v-for="rowIndex in mapRows"
        :key="`row-${rowIndex}`"
        class="map-row"
      >
        <MapTile
          v-for="colIndex in mapCols"
          :key="`tile-${rowIndex}-${colIndex}`"
          :tile="gameStateManager.mapManager.getTileAt(colIndex, rowIndex)"
          :style="{
            width: `${gameStateManager?.mapManager?.tileSize || 20}px`,
            height: `${gameStateManager?.mapManager?.tileSize || 20}px`,
          }"
        />
      </div>
      <!-- Render buildings -->
      <MapBuilding
        v-for="building in (gameStateManager && gameStateManager.buildingManager && gameStateManager.buildingManager.buildings.value) || []"
        :key="building.id"
        :building="building"
      />
      <!-- Render citizens -->
      <MapCitizen
        v-for="citizen in Array.from((gameStateManager?.citizenManager?.citizens?.value instanceof Map ? gameStateManager.citizenManager.citizens.value.values() : []) || [])"
        :key="citizen.id"
        :citizen="citizen"
        :update-signal="gameStateManager.tickCounter.value"
      />
      <!-- Render vehicles -->
      <MapVehicle
        v-for="vehicle in (gameStateManager && gameStateManager.vehicleManager && gameStateManager.vehicleManager.vehicles.value) || []"
        :key="vehicle.id"
        :vehicle="vehicle"
        :update-signal="gameStateManager.tickCounter.value"
      />
    </div>
    <div v-else>
      <p>Loading map data...</p>
    </div>
  </div>
</template>

<script setup>
import MapTile from "./MapTile.vue";
import MapBuilding from "./MapBuilding.vue";
import MapCitizen from "./MapCitizen.vue"; // Import MapCitizen
import MapVehicle from "./MapVehicle.vue"; // Import MapVehicle
import { inject, computed } from "vue";

const gameStateManager = inject("gameStateManager");

const mapWidth = computed(() => gameStateManager.mapManager?.width || 0);
const mapHeight = computed(() => gameStateManager.mapManager?.height || 0);

const mapRows = computed(() => Array.from({ length: mapHeight.value }, (_, i) => i));
const mapCols = computed(() => Array.from({ length: mapWidth.value }, (_, i) => i));

</script>

<style scoped>
.world-map-container {
  position: relative; /* Needed for absolute positioning of buildings */
  display: inline-block;
  border: 1px solid black;
  /* Ensure the container size is based on its content (the grid) */
  /* This might need adjustment if map size is dynamic and large */
  padding: 0; /* Remove padding if any to make calculations exact */
  line-height: 0; /* Helps remove extra space if MapTiles are inline-block */
}
.world-map-grid {
  display: flex;
  flex-direction: column;
}
.map-row {
  display: flex;
}
</style>
