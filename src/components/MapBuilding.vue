<template>
  <div
    class="map-building"
    :style="styleObject"
    :title="`${building.type} (${building.id})`"
  >
    <!-- {{ building.type.charAt(0) }} -->
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { BUILDING_COLORS } from '@/constants/buildingTypes';

const props = defineProps({
  building: {
    type: Object,
    required: true,
  },
  cellSize: {
    type: Number,
    default: 20, // Must match MapBlock.vue's default size + border for accurate positioning
  }
});

const styleObject = computed(() => {
  const details = props.building.getDetails ? props.building.getDetails() : props.building;
  return {
    position: 'absolute',
    left: `${details.position.x * props.cellSize}px`,
    top: `${details.position.y * props.cellSize}px`,
    width: `${details.size.width * props.cellSize}px`,
    height: `${details.size.height * props.cellSize}px`,
    backgroundColor: BUILDING_COLORS[details.type] || 'pink', // Default color if type unknown
    border: '1px solid black', // This border is part of the building's dimensions due to box-sizing
    zIndex: 10, // Ensure buildings are on top of map blocks
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    color: 'white',
    boxSizing: 'border-box',
  };
});

</script>

<style scoped>
.map-building {
  /* Basic styling, most is done via styleObject */
  transition: all 0.3s ease;
}
.map-building:hover {
  opacity: 0.8;
}
</style>
