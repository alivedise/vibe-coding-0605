<template>
  <div class="building-table-container">
    <Sidebar v-model:visible="displaySidebar" position="right" class="p-sidebar-md">
      <template #header>
        <h3>Building Details</h3>
      </template>
      <div v-if="selectedBuilding">
        <p><strong>ID:</strong> {{ selectedBuilding.id }}</p>
        <p><strong>Type:</strong> {{ selectedBuilding.type }}</p>
        <p><strong>Location (X, Y):</strong> {{ selectedBuilding.x }}, {{ selectedBuilding.y }}</p>
        <p><strong>Size (W x H):</strong> {{ selectedBuilding.width }} x {{ selectedBuilding.height }}</p>
        <p><strong>Company ID:</strong> {{ selectedBuilding.companyId ? selectedBuilding.companyId : 'N/A' }}</p>
        <p><strong>Tile ID:</strong> {{ selectedBuilding.tileId ? selectedBuilding.tileId : 'N/A' }}</p>
        <h5>Residents:</h5>
        <ul v-if="selectedBuilding.residents && selectedBuilding.residents.length > 0">
          <li v-for="(resident, index) in selectedBuilding.residents" :key="resident.id || index">
            <ProductDisplay :item="resident" />
          </li>
        </ul>
        <p v-else>No residents.</p>
        <h5>Stockings:</h5>
        <ul v-if="selectedBuilding.stockings && selectedBuilding.stockings.length > 0">
          <li v-for="(stocking, index) in selectedBuilding.stockings" :key="stocking.id || index">
            <ProductDisplay :item="stocking" />
          </li>
        </ul>
        <p v-else>No stockings.</p>
      </div>
    </Sidebar>
    <DataTable :value="buildings"
      selectionMode="single"
      v-model:selection="selectedBuildingForTable"
      @row-select="onRowSelect" :paginator="true" :rows="10" responsiveLayout="scroll" stripedRows>
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
import { ref, inject } from 'vue';
import Sidebar from 'primevue/sidebar';
import ProductDisplay from '@/components/ProductDisplay.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const gameStateManager = inject('gameStateManager');

const buildings = gameStateManager.buildingManager.buildings;
const selectedBuilding = ref(null);
const selectedBuildingForTable = ref(null);
const displaySidebar = ref(false);

const onRowSelect = (event) => {
  selectedBuilding.value = event.data;
  displaySidebar.value = true;
};

const closeSidebar = () => { // Though not explicitly called by a button, good to have if needed
  displaySidebar.value = false;
  selectedBuilding.value = null;
  selectedBuildingForTable.value = null;
};

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
