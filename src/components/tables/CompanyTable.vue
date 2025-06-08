<template>
  <div class="card">
    <h5>Companies</h5>
    <DataTable :value="companies" responsiveLayout="scroll" :paginator="true" :rows="5">
      <Column field="id" header="ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.id.substring(0, 8) }}...
        </template>
      </Column>
      <Column field="name" header="Name" :sortable="true"></Column>
      <Column field="industry" header="Industry" :sortable="true"></Column>
      <Column field="buildingId" header="Building ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.buildingId ? slotProps.data.buildingId.substring(0, 8) + '...' : 'N/A' }}
        </template>
      </Column>
      <Column header="Open Jobs">
        <template #body="slotProps">
          {{ slotProps.data.getOpenJobs().length }}
        </template>
      </Column>
       <Column header="Total Jobs">
        <template #body="slotProps">
          {{ slotProps.data.jobs.length }}
        </template>
      </Column>
      <Column header="Stock">
        <template #body="slotProps">
          {{ slotProps.data.building.stockings.length }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const gameStateManager = inject('gameStateManager');

const companies = computed(() => {
  if (gameStateManager && gameStateManager.companyManager) {
    return gameStateManager.companyManager.companies.value;
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
