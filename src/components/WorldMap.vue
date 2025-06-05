<template>
  <div class="world-map-container" :style="containerStyle">
    <div v-if="mapData && mapData.grid && mapData.grid.length" class="world-map-grid">
      <div v-for="(row, rowIndex) in mapData.grid" :key="`row-${rowIndex}`" class="map-row">
        <MapBlock
          v-for="(block, colIndex) in row"
          :key="`block-${rowIndex}-${colIndex}`"
          :terrain-type="block.type"
          :style="{ width: `${props.mapData.cellSize}px`, height: `${props.mapData.cellSize}px` }"
        />
      </div>
      <!-- Render buildings -->
      <MapBuilding
        v-for="building in mapData.buildings"
        :key="building.id"
        :building="building"
        :cell-size="props.mapData.cellSize"
      />
      <!-- Render citizens -->
      <MapCitizen 
        v-for="citizen in mapData.citizens" 
        :key="citizen.id"
        :citizen="citizen"
        :cell-size="props.mapData.cellSize"
      />
    </div>
    <div v-else>
      <p>Loading map data...</p>
    </div>
  </div>
</template>

<script setup>
import MapBlock from './MapBlock.vue';
import MapBuilding from './MapBuilding.vue';
import MapCitizen from './MapCitizen.vue'; // Import MapCitizen

const props = defineProps({
  mapData: { // mapData is now an object { grid: [], buildings: [], citizens: [], width: 0, height: 0 }
    type: Object,
    required: true,
    default: () => ({ grid: [], buildings: [], citizens: [], width: 0, height: 0 }),
  }
});
</script>

<style scoped>
.world-map-container {
  position: relative; /* Needed for absolute positioning of buildings */
  display: inline-block; 
  border: 1px solid black;
  /* Ensure the container size is based on its content (the grid) */
  /* This might need adjustment if map size is dynamic and large */
  padding: 0; /* Remove padding if any to make calculations exact */
  line-height: 0; /* Helps remove extra space if MapBlocks are inline-block */
}
.world-map-grid {
  display: flex;
  flex-direction: column;
}
.map-row {
  display: flex;
}
</style>
