<template>
  <div
    class="map-citizen"
    :style="styleObject"
    :title="`${citizen.name} (ID: ${citizen.id})`"
  ></div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  citizen: {
    type: Object,
    required: true,
  },
  cellSize: {
    type: Number,
    default: 20, // Must match MapBlock.vue's default size for accurate positioning
  }
});

// Simple function to generate a color based on citizen ID
const generateColorFromId = (id) => {
  if (!id) return '#FFFFFF'; // Default to white if no ID
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - color.length) + color;
};

console.log('MapCitizen props.citizen:', props.citizen);

const styleObject = computed(() => {
  // Ensure props.citizen and its properties are accessed correctly
  // props.citizen.x and props.citizen.y are plain numbers now, no .value needed.
  const citizenSize = Math.max(4, props.cellSize / 5); // Citizen dot size, e.g., 4px or 1/5th of cell
  return {
    position: 'absolute',
    left: `${props.citizen.x * props.cellSize + (props.cellSize / 2) - (citizenSize / 2)}px`,
    top: `${props.citizen.y * props.cellSize + (props.cellSize / 2) - (citizenSize / 2)}px`,
    width: `${citizenSize}px`,
    height: `${citizenSize}px`,
    backgroundColor: generateColorFromId(props.citizen.id),
    border: '1px solid #333',
    borderRadius: '50%', // Make it a circle
    zIndex: 20, // Ensure citizens are on top of buildings and map blocks
    boxSizing: 'border-box',
  };
});

console.log('MapCitizen styleObject.value:', styleObject.value);

</script>

<style scoped>
.map-citizen:hover {
  transform: scale(1.5); /* Slightly enlarge on hover */
}
</style>
