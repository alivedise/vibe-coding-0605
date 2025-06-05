<template>
  <div class="map-block" :style="{ backgroundColor: blockColor }">
    <!-- {{ terrainType }} -->
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { TERRAIN_COLORS } from '@/constants/terrainTypes';

const props = defineProps({
  terrainType: {
    type: String,
    required: true,
  },
});

const blockColor = computed(() => {
  return TERRAIN_COLORS[props.terrainType] || 'white'; // Default to white if type is unknown
});
</script>

<style scoped>
.map-block {
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
