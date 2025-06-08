<template>
  <div class="building-table-container">
    <DataTable :value="buildings" :paginator="true" :rows="10" responsiveLayout="scroll" stripedRows>
      <template #header>
        <div class="table-header">
          Building Details
        </div>
      </template>
      <Column field="id" header="ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.id.substring(0, 8) }}...
        </template>
      </Column>
      <Column field="type" header="Type" :sortable="true"></Column>
      <Column header="Location (X, Y)" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.x }}, {{ slotProps.data.y }}
        </template>
      </Column>
      <Column header="Size (W x H)" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.width }} x {{ slotProps.data.height }}
        </template>
      </Column>
      <Column field="companyId" header="Company ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.companyId ? slotProps.data.companyId.substring(0,8) + '...' : 'N/A' }}
        </template>
      </Column>
      <Column header="Tile ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.tileId ? slotProps.data.tileId.substring(0,8) : 'N/A' }}
        </template>
      </Column>
      <Column header="Stock" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.stockings.length }}
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

const buildings = computed(() => {
  if (gameStateManager && gameStateManager.buildingManager) {
    return gameStateManager.buildingManager.buildings.value;
  }
  return [];
});

</script>

<style scoped>
.building-table-container {
  margin-top: 1rem;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}
</style>
