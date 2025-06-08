<template>
  <div class="citizen-table-container">
    <DataTable
      :value="citizens"
      :paginator="true"
      :rows="10"
      responsiveLayout="scroll"
      stripedRows
      dataKey="id"
    >
      <template #header>
        <div class="table-header">
          <Button icon="pi pi-refresh" class="p-button-sm p-button-text" @click="updateCitizens" label="Refresh" />
        </div>
      </template>
      <Column field="id" header="ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.id.substring(0, 8) }}...
        </template>
      </Column>
      <Column field="name" header="Name" :sortable="true"></Column>
      <Column field="age" header="Age" :sortable="true"></Column>
      <Column field="occupation" header="Occupation" :sortable="true"></Column>
      <Column field="action.name" header="Current Action" :sortable="true"></Column>
      <Column field="currentTile.id" header="Current Tile ID" :sortable="true"></Column>
      <Column field="targetTile.id" header="Target Tile ID" :sortable="true"></Column>
      <Column field="jobId" header="Job ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.jobId ? slotProps.data.jobId.substring(0,8) + '...' : 'N/A' }}
        </template>
      </Column>
      <Column field="companyId" header="Company ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.companyId ? slotProps.data.companyId.substring(0,8) + '...' : 'N/A' }}
        </template>
      </Column>
      <Column field="skills" header="Skills">
        <template #body="slotProps">
          {{ slotProps.data.skills.join(', ') }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { inject, ref, nextTick, reactive, computed } from 'vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const gameStateManager = inject('gameStateManager');

const citizens = ref([]);

const updateCitizens = () => {
  citizens.value = [];
  nextTick(() => {
    citizens.value = gameStateManager.citizenManager.citizens;
  });
};

updateCitizens();

</script>

<style scoped>
.citizen-table-container {
  margin-top: 1rem;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}
</style>
