<template>
  <div class="world-map-container">
    <canvas ref="mapCanvasRef"></canvas>
    <div v-if="isLoading" class="loading-overlay">
      <p>Loading map data...</p>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted, computed } from "vue";

const gameStateManager = inject("gameStateManager");

const mapCanvasRef = ref(null);

const isLoading = computed(() => {
  return false;
});

onMounted(() => {
  gameStateManager.canvasManager.feedCanvas(mapCanvasRef.value);
  mapCanvasRef.value.width = gameStateManager.configurationManager.MAP_WIDTH * gameStateManager.configurationManager.TILE_SIZE;
  mapCanvasRef.value.height = gameStateManager.configurationManager.MAP_HEIGHT * gameStateManager.configurationManager.TILE_SIZE;
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
  line-height: 0; /* Helps remove extra space if MapTiles are inline-block */
}
canvas {
  display: block; /* Avoids extra space below canvas */
  background-color: #f0f0f0; /* Light background for the map area */
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
}
</style>
