<template>
  <header>
    <h1>City Simulator</h1>
  </header>

  <main>
    <div class="layout-container">
      <div class="game-container">
        <WorldMap :map-data="mapDataForWorldMap" />
      </div>
      <div class="sidebar-container">
        <CitizenList />
        <!-- We can add other lists or controls here later -->
      </div>
    </div>
  </main>
</template>

<script setup>
import WorldMap from '@/components/WorldMap.vue';
import CitizenList from '@/components/CitizenList.vue';
import GameStateManager from '@/core/managers/GameStateManager';
import { provide, computed, onMounted, onUnmounted } from 'vue';

const gameStateManager = new GameStateManager();
provide('gameStateManager', gameStateManager);

// WorldMap expects mapData: { grid, buildings, citizens, width, height }
const mapDataForWorldMap = computed(() => {
  const context = gameStateManager.getContext();
  // context.map.value is { grid, buildings, width, height }
  // context.citizens.value is the citizens array
  return {
    grid: context.map.value.grid,
    buildings: context.map.value.buildings,
    width: context.map.value.width,
    height: context.map.value.height,
    citizens: context.citizens.value,
    cellSize: context.map.value.cellSize,
  };
});

let gameLoopIntervalId;
const GAME_TICK_INTERVAL_MS = 1000; // e.g., tick every second

onMounted(() => {
  console.log('App.vue mounted, starting game loop.');
  gameLoopIntervalId = setInterval(() => {
    gameStateManager.tick();
    // The computed 'mapDataForWorldMap' will update automatically if its dependencies change.
  }, GAME_TICK_INTERVAL_MS);
});

onUnmounted(() => {
  console.log('App.vue unmounted, clearing game loop.');
  clearInterval(gameLoopIntervalId);
});


</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;
}

.game-container {
  border: 1px solid #ccc;
  flex-grow: 1; /* Allow map to take available space if sidebar is fixed width */
}

.sidebar-container {
  width: 350px; /* Fixed width for the sidebar */
  flex-shrink: 0; /* Prevent sidebar from shrinking */
  /* Styles for sidebar content will be in CitizenList.vue or other components */
}
</style>
