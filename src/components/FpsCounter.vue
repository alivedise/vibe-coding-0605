<template>
  <div class="fps-counter" @click="handleClick" style="cursor: pointer;">
    FPS: {{ fps }}
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue';

const fps = ref(0);
let frameCount = 0;
let lastTime = performance.now();
let animationFrameId = null;
const gameStateManager = inject('gameStateManager');
const emit = defineEmits(['request-show-chart']);

const handleClick = () => {
  emit('request-show-chart');
};

const calculateFps = () => {
  frameCount++;
  const currentTime = performance.now();
  const deltaTime = currentTime - lastTime;

  if (deltaTime >= 1000) { // Update FPS every second
    fps.value = Math.round((frameCount * 1000) / deltaTime);
    if (gameStateManager) {
      gameStateManager.addFpsData(fps.value);
    }
    frameCount = 0;
    lastTime = currentTime;
  }

  animationFrameId = requestAnimationFrame(calculateFps);
};

onMounted(() => {
  lastTime = performance.now(); // Reset lastTime on mount
  animationFrameId = requestAnimationFrame(calculateFps);
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.fps-counter {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  z-index: 1000; /* Ensure it's on top */
}
</style>
