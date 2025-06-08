<template>
  <header>
    <h1>City Simulator</h1>
  </header>

  <main>
    <div class="layout-container">
      <div class="game-container">
        <WorldMap />
      </div>
      <div class="sidebar-container" v-if="showStatistics">
        <TabView>
          <TabPanel header="Citizen Overview">
            <CitizenList />
          </TabPanel>
          <TabPanel header="Citizen Details">
            <CitizenTable />
          </TabPanel>
          <TabPanel header="Companies">
            <CompanyTable />
          </TabPanel>
          <TabPanel header="Jobs">
            <JobTable />
          </TabPanel>
          <TabPanel header="Products">
            <ProductTable />
          </TabPanel>
          <TabPanel header="Vehicles">
            <VehicleTable />
          </TabPanel>
          <TabPanel header="Buildings">
            <BuildingTable />
          </TabPanel>
          <TabPanel header="Map Tiles">
            <TileTable />
          </TabPanel>
        </TabView>
      </div>
    </div>
    <div class="controls-container">
      <Button :label="pauseButtonLabel" @click="togglePause" />
      <Button :label="showStatistics ? 'Hide Statistics' : 'Show Statistics'" @click="toggleStatistics" />
      <FpsCounter @request-show-chart="openFpsChartDialog" />
    </div>
  </main>

  <Dialog header="FPS Trend Analysis" v-model:visible="showFpsChartDialog" modal :style="{width: '75vw', height: '70vh'}" :breakpoints="{'960px': '75vw', '640px': '90vw'}">
    <FpsTrendChart />
  </Dialog>
</template>

<script setup>
import WorldMap from "@/components/WorldMap.vue";
import CitizenList from "@/components/CitizenList.vue";
import CitizenTable from "@/components/tables/CitizenTable.vue";
import CompanyTable from "@/components/tables/CompanyTable.vue";
import JobTable from "@/components/tables/JobTable.vue";
import ProductTable from "@/components/tables/ProductTable.vue";
import VehicleTable from "@/components/tables/VehicleTable.vue";
import BuildingTable from "@/components/tables/BuildingTable.vue";
import TileTable from "@/components/tables/TileTable.vue";
import FpsTrendChart from "@/components/charts/FpsTrendChart.vue"; // Import the new chart
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import FpsCounter from "@/components/FpsCounter.vue";
import Dialog from 'primevue/dialog'; // Import Dialog
import GameStateManager from "@/core/managers/GameStateManager";
import { provide, onMounted, onUnmounted, computed, ref } from "vue";

const showStatistics = ref(false);
const showFpsChartDialog = ref(false);

const gameStateManager = new GameStateManager();
provide("gameStateManager", gameStateManager);

let rafId;

const gameLoop = () => {
  gameStateManager.tick(); // GameStateManager.tick() already handles the isPaused state
  rafId = requestAnimationFrame(gameLoop);
};

onMounted(() => {
  console.log("App.vue mounted, starting game loop with requestAnimationFrame.");
  gameLoop(); // Start the loop
});

onUnmounted(() => {
  console.log("App.vue unmounted, cancelling animation frame.");
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
});

const pauseButtonLabel = computed(() => {
  return gameStateManager.isPaused.value ? 'Resume' : 'Pause';
});

const togglePause = () => {
  if (gameStateManager.isPaused.value) {
    gameStateManager.resumeGame();
  } else {
    gameStateManager.pauseGame();
  }
};

const toggleStatistics = () => {
  showStatistics.value = !showStatistics.value;
};

const openFpsChartDialog = () => {
  showFpsChartDialog.value = true;
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  flex-shrink: 0; /* Prevent header from shrinking */
  /* Add padding or height to header as needed */
  padding: 1rem;
  background-color: #333;
  color: white;
}

main {
  width: 100%; /* Ensure main content area takes full width */
  flex-grow: 1; /* Allow main to take available vertical space in #app flex container */
  display: flex; /* Make main a flex container for its children */
  flex-direction: column; /* Stack .layout-container and .fps-counter vertically */
}
.layout-container {
  width: 100%; /* Ensure layout-container also takes full width of main */
  display: flex;
  flex-direction: column; /* Changed from row to column */
  gap: 20px;
  /* align-items: flex-start; /* May not be needed or could be stretch */
  flex-grow: 1; /* Allow layout-container to take available space */
  overflow-y: auto; /* Add scroll if content overflows */
}

.controls-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-top: 1px solid #ccc;
  flex-shrink: 0; /* Prevent controls-container from shrinking */
}

.game-container {
  border: 1px solid #ccc;
  /* flex-grow: 1; */ /* Replaced with specific height/flex basis */
  height: 200px; /* Example: Map takes 60% of the layout-container height */
  width: 100%; /* Map takes full width */
}

.sidebar-container {
  /* width: 350px; */ /* Removed fixed width */
  width: 100%; /* Tables take full width */
  flex-grow: 1; /* Tables take remaining vertical space */
  overflow-y: auto; /* Allow scrolling if tables exceed space */
  /* Styles for sidebar content will be in CitizenList.vue or other components */
}
</style>
