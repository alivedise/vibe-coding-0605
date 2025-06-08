<template>
  <div class="card">
    <h5>Jobs</h5>
    <DataTable :value="allJobs" responsiveLayout="scroll" :paginator="true" :rows="10">
      <Column field="id" header="ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.id.substring(0, 8) }}...
        </template>
      </Column>
      <Column field="title" header="Title" :sortable="true"></Column>
      <Column field="company.name" header="Company" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.company ? slotProps.data.company.name : slotProps.data.companyId.substring(0,8) + '...' }}
        </template>
      </Column>
      <Column field="salary" header="Salary" :sortable="true">
        <template #body="slotProps">
          ${{ slotProps.data.salary }}
        </template>
      </Column>
      <Column field="requiredSkills" header="Skills">
        <template #body="slotProps">
          {{ slotProps.data.requiredSkills.join(', ') }}
        </template>
      </Column>
      <Column field="occupied" header="Occupied" :sortable="true">
        <template #body="slotProps">
          <i :class="['pi', slotProps.data.occupied ? 'pi-check-circle' : 'pi-times-circle']" 
             :style="{ color: slotProps.data.occupied ? 'green' : 'red' }"></i>
        </template>
      </Column>
      <Column field="progress" header="Progress" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.progress }} / {{ slotProps.data.maxProgress }}
        </template>
      </Column>
      <Column field="employeeId" header="Employee ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.employeeId ? slotProps.data.employeeId.substring(0,8) + '...' : 'N/A' }}
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

const allJobs = gameStateManager.jobManager.jobs;

</script>

<style scoped>
.card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
}
.pi-check-circle {
  color: green;
}
.pi-times-circle {
  color: red;
}
</style>
