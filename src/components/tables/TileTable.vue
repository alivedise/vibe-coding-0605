<template>
  <div class="tile-table-container">
    <DataTable :value="tiles" :paginator="true" :rows="15" responsiveLayout="scroll" stripedRows>
      <template #header>
        <div class="table-header">
          Map Tile Details
        </div>
      </template>
      <Column field="id" header="ID" :sortable="true"></Column>
      <Column field="x" header="X" :sortable="true"></Column>
      <Column field="y" header="Y" :sortable="true"></Column>
      <Column field="type" header="Type" :sortable="true"></Column>
      <Column field="isWalkable" header="Walkable" :sortable="true">
        <template #body="slotProps">
          <i :class="['pi', slotProps.data.isWalkable ? 'pi-check-circle' : 'pi-times-circle']"
             :style="{ color: slotProps.data.isWalkable ? 'green' : 'red' }"></i>
        </template>
      </Column>
      <Column field="terrainCost" header="Terrain Cost" :sortable="true"></Column>
      <Column field="buildingId" header="Building ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.buildingId ? slotProps.data.buildingId.substring(0,8) + '...' : 'N/A' }}
        </template>
      </Column>
      <Column header="Stockings Count" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.stockings ? slotProps.data.stockings.length : 0 }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const gameStateManager = inject('gameStateManager');

const tiles = computed(() => {
  if (gameStateManager && gameStateManager.mapManager && gameStateManager.mapManager.tiles) {
    return gameStateManager.mapManager.tiles;
  }
  return [];
});

</script>

<style scoped>
.tile-table-container {
  margin-top: 1rem;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}
</style>
