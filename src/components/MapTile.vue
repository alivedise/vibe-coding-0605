<template>
  <div class="map-tile" :style="{ backgroundColor: tileColor }">
    <!-- {{ tile.type }} ({{tile.x}}, {{tile.y}}) -->
  </div>
</template>

<script setup>
import { computed } from "vue";
import { TERRAIN_COLORS } from "@/constants/terrainTypes";

const props = defineProps({
  tile: {
    type: Object,
    required: true,
  },
});

const tileColor = computed(() => {
  return TERRAIN_COLORS[props.tile.type] || "white"; // Default to white if type is unknown
});
</script>

<style scoped>
.map-tile {
  /* width and height will be set by style prop from WorldMap.vue */
  /* default: 20px; */
  /* default: 20px; */
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  box-sizing: border-box; /* Ensure border is included in width/height */
}
</style>
