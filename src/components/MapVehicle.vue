<template>
  <div
    class="map-vehicle"
    :style="styleObject"
    :title="`${vehicle.modelName} (ID: ${vehicle.id}) - ${vehicle.type}`"
  >
    <span class="vehicle-icon">&#x1F69A;</span> <!-- Truck icon -->
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  updateSignal: Number, // Add this prop
  vehicle: {
    type: Object,
    required: true,
  },
  tileSize: {
    type: Number,
    default: 20, // Must match MapTile.vue's default size for accurate positioning
  },
});

// Simple function to generate a color based on vehicle ID or type for variety
const getVehicleColor = (vehicle) => {
  if (!vehicle || !vehicle.id) return "#888888"; // Default gray
  // Basic color variation based on type, could be more sophisticated
  switch (vehicle.type) {
    case 'truck':
      return '#B8860B'; // DarkGoldenRod
    case 'van':
      return '#4682B4'; // SteelBlue
    case 'car':
      return '#CD5C5C'; // IndianRed
    default:
      let hash = 0;
      for (let i = 0; i < vehicle.id.length; i++) {
        hash = vehicle.id.charCodeAt(i) + ((hash << 5) - hash);
      }
      const color = (hash & 0x00ffffff).toString(16).toUpperCase();
      return "#" + "00000".substring(0, 6 - color.length) + color;
  }
};

// console.log("MapVehicle props.vehicle:", props.vehicle);

const styleObject = computed(() => {
  // Access props.updateSignal to make this computed property reactive to it
  const _updateSignal = props.updateSignal;
  // props.vehicle.x and props.vehicle.y are plain numbers now, no .value needed.
  const vehicleSize = Math.max(6, props.tileSize / 3); // Vehicle icon size
  return {
    position: "absolute",
    left: `${props.vehicle.x}px`,
    top: `${props.vehicle.y}px`,
    width: `${vehicleSize}px`,
    height: `${vehicleSize}px`,
    // backgroundColor: getVehicleColor(props.vehicle),
    // border: "1px solid #222",
    // borderRadius: "2px", // Slightly squared for vehicles
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${vehicleSize * 0.8}px`, // Adjust icon size within the div
    zIndex: 25, // Ensure vehicles are on top of citizens and map blocks
    boxSizing: "border-box",
    transition: "left 0.1s linear, top 0.1s linear", // Smooth movement
  };
});
</script>

<style scoped>
.map-vehicle {
  /* Basic styling, can be enhanced */
  text-align: center;
  line-height: 1;
}
</style>
