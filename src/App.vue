<template>
  <header>
    <h1>City Simulator</h1>
  </header>

  <main>
    <div class="layout-container">
      <div class="game-container">
        <WorldMap />
      </div>
      <div class="sidebar-container">
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
        </TabView>
      </div>
    </div>
    <FpsCounter />
  </main>
</template>

<script setup>
import WorldMap from "@/components/WorldMap.vue";
import CitizenList from "@/components/CitizenList.vue";
import CitizenTable from "@/components/tables/CitizenTable.vue";
import CompanyTable from "@/components/tables/CompanyTable.vue";
import JobTable from "@/components/tables/JobTable.vue";
import ProductTable from "@/components/tables/ProductTable.vue";
import VehicleTable from "@/components/tables/VehicleTable.vue";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import FpsCounter from "@/components/FpsCounter.vue";
import GameStateManager from "@/core/managers/GameStateManager";
import { provide, onMounted, onUnmounted } from "vue";

const gameStateManager = new GameStateManager();
provide("gameStateManager", gameStateManager);

let gameLoopIntervalId;
const GAME_TICK_INTERVAL_MS = 1000/60; // e.g., tick every second

onMounted(() => {
  console.log("App.vue mounted, starting game loop.");
  gameLoopIntervalId = setInterval(() => {
    gameStateManager.tick();
  }, GAME_TICK_INTERVAL_MS);
});

onUnmounted(() => {
  console.log("App.vue unmounted, clearing game loop.");
  clearInterval(gameLoopIntervalId);
});
</script>

<style scoped>
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
  height: calc(100vh - 100px); /* Example: Adjust based on header/footer height */
}

.game-container {
  border: 1px solid #ccc;
  /* flex-grow: 1; */ /* Replaced with specific height/flex basis */
  height: 60%; /* Example: Map takes 60% of the layout-container height */
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
