<template>
  <div class="card">
    <h5>Vehicles</h5>
    <DataTable :value="allVehicles" responsiveLayout="scroll" :paginator="true" :rows="5" emptyMessage="No vehicles found or VehicleManager not available.">
      <Column field="id" header="ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.id ? slotProps.data.id.substring(0, 8) + '...' : 'N/A' }}
        </template>
      </Column>
      <Column field="type" header="Type" :sortable="true"></Column>
      <Column field="ownerId" header="Owner ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.ownerId ? slotProps.data.ownerId.substring(0, 8) + '...' : 'N/A' }}
        </template>
      </Column>
      <Column field="status" header="Status" :sortable="true"></Column>
      <!-- Add more columns as Vehicle model develops -->
    </DataTable>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const gameStateManager = inject('gameStateManager');

const allVehicles = computed(() => {
  if (gameStateManager && gameStateManager.vehicleManager && gameStateManager.vehicleManager.vehicles) {
    // Assuming vehicles is a ref like other managers
    return gameStateManager.vehicleManager.vehicles.value;
  }
  return [];
});

</script>

<style scoped>
.card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
}
</style>
