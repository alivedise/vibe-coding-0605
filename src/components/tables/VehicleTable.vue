<template>
  <div class="card">
    <h5>Vehicles</h5>
    <DataTable
      :value="reactiveVehicles"
      responsiveLayout="scroll"
      :paginator="true"
      :rows="5"
      emptyMessage="No vehicles found or VehicleManager not available."
      dataKey="id"
    >
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
      <Column field="carryingId" header="Carrying" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.carryingId ? slotProps.data.carryingId.substring(0, 8) + '...' : 'N/A' }}
        </template>
      </Column>
      <Column field="currentTile" header="Current Tile" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.currentTile ? slotProps.data.currentTile.id.substring(0, 8) + '...' : 'N/A' }}
        </template>
      </Column>
      <Column field="targetTile" header="Target Tile" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.targetTile ? slotProps.data.targetTile.id.substring(0, 8) + '...' : 'N/A' }}
        </template>
      </Column>
      <!-- Add more columns as Vehicle model develops -->
    </DataTable>
  </div>
</template>

<script setup>
import { computed, inject, shallowReactive } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const gameStateManager = inject('gameStateManager');

const vehicles = computed(() => {
  if (gameStateManager && gameStateManager.vehicleManager) {
    // Convert Map values to an array
    if (gameStateManager.tickCounter.value > 0) {
      return gameStateManager.vehicleManager.vehicles.map((vehicle) => {
        vehicle.tickCounter = gameStateManager.tickCounter.value;
        return vehicle;
      });
    }
    return [];
  }
  return [];
});

// This computed property will now create reactive versions of vehicle data for the table
const reactiveVehicles = computed(() => {
  if (gameStateManager && gameStateManager.vehicleManager && gameStateManager.vehicleManager.vehicles) {
    // The dependency on tickCounter.value ensures this computed property re-evaluates each tick
    if (gameStateManager.tickCounter.value >= 0) { // Ensure tick has started
      return gameStateManager.vehicleManager.vehicles.map(vehiclePJO => {
        // Create a new reactive object for each PJO for this render cycle.
        // This makes a shallow reactive copy.
        return shallowReactive({ ...vehiclePJO }); 
      });
    }
    return [];
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
