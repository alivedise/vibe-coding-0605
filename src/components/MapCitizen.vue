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

// Linear interpolation function
const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const styleObject = computed(() => {
  // Ensure props.citizen and its properties are accessed correctly
  // props.citizen.x and props.citizen.y are plain numbers now, no .value needed.
  
  let displayX, displayY;

  if (props.citizen.isMoving) {
    console.log(`[MapCitizen.vue SMOOTH] ${props.citizen.name} interpolating: prog=${props.citizen.movementProgress.toFixed(2)}, from=(${props.citizen.originGridX},${props.citizen.originGridY}) to=(${props.citizen.targetGridX},${props.citizen.targetGridY})`);
    displayX = lerp(props.citizen.originGridX, props.citizen.targetGridX, props.citizen.movementProgress);
    displayY = lerp(props.citizen.originGridY, props.citizen.targetGridY, props.citizen.movementProgress);
  } else {
    displayX = props.citizen.x;
    displayY = props.citizen.y;
  }

  // The [MapCitizen.vue DEBUG] log can be removed or modified if too verbose
  console.log(`[MapCitizen.vue DEBUG] styleObject for ${props.citizen.name} at display (${displayX.toFixed(2)}, ${displayY.toFixed(2)}) grid (${props.citizen.x}, ${props.citizen.y})`);
  console.log(`[MapCitizen.vue DEBUG] styleObject re-evaluating for ${props.citizen.name} at (${props.citizen.x}, ${props.citizen.y})`);
  // Directly use props.citizen for x, y, and id
  // The citizen object itself is passed, not the result of getInfo()
  const citizenSize = Math.max(4, props.cellSize / 5); // Citizen dot size, e.g., 4px or 1/5th of cell

  return {
    position: 'absolute',
    left: `${displayX * props.cellSize + (props.cellSize / 2) - (citizenSize / 2)}px`,
    top: `${displayY * props.cellSize + (props.cellSize / 2) - (citizenSize / 2)}px`,
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
.map-citizen {
  /* Basic styling, most is done via styleObject */
  transition: all 0.1s ease;
}
.map-citizen:hover {
  transform: scale(1.5); /* Slightly enlarge on hover */
}
</style>
