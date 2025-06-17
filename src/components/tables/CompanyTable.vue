<template>
  <div class="company-table-container">
    <Sidebar v-model:visible="displaySidebar" position="right" class="p-sidebar-md">
      <template #header>
        <h3>Company Details</h3>
      </template>
      <div v-if="selectedCompany">
        <p><strong>ID:</strong> {{ selectedCompany.id ? selectedCompany.id.substring(0,8) : 'N/A' }}...</p>
        <p><strong>Name:</strong> {{ selectedCompany.name }}</p>
        <p><strong>Industry:</strong> {{ selectedCompany.industry }}</p>
        <p><strong>Building ID:</strong> {{ selectedCompany.buildingId ? selectedCompany.buildingId.substring(0, 8) + '...' : 'N/A' }}</p>
        <h5>Vehicles:</h5>
        <ul v-if="selectedCompany.vehicles && selectedCompany.vehicles.length > 0" class="vehicle-list">
          <li v-for="vehicle in selectedCompany.vehicles" :key="vehicle.id">
            <ProductDisplay :item="vehicle" /> (Capacity: {{ vehicle.capacity }})
          </li>
        </ul>
        <p v-else>No vehicles listed for this company.</p>
        <h5>Jobs:</h5>
        <ul v-if="selectedCompany.jobs && selectedCompany.jobs.length > 0" class="job-list">
          <li v-for="job in selectedCompany.jobs" :key="job.id">
            <strong>{{ job.title }}</strong> (Salary: {{ job.salary }})
            <div v-if="job.citizenId">
              Occupied by: {{ getCitizenName(job.citizenId) }} (ID: {{ job.citizenId ? job.citizenId.substring(0,8) : 'N/A' }}...)
            </div>
            <div v-else>
              Status: <span class="job-open">Open</span>
            </div>
          </li>
        </ul>
        <p v-else>No jobs listed for this company.</p>
      </div>
      <div v-else>
        <p>Select a company to see details.</p>
      </div>
    </Sidebar>

    <DataTable :value="companies" 
               selectionMode="single" 
               v-model:selection="selectedCompany" 
               @row-select="onRowSelect" 
               :paginator="true" :rows="10" 
               responsiveLayout="scroll" 
               stripedRows 
               class="p-datatable-sm companies-table">
      <template #header>
        <div class="table-header">
          Companies
        </div>
      </template>
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
      <Column header="Open Jobs" :sortable="true" field="openJobsCount">
        <template #body="slotProps">
          {{ slotProps.data.openJobsCount }}
        </template>
      </Column>
       <Column header="Total Jobs" :sortable="true" field="totalJobsCount">
        <template #body="slotProps">
          {{ slotProps.data.totalJobsCount }}
        </template>
      </Column>
      <Column header="Stock" v-if="showStockColumn" :sortable="true" field="stockCount">
        <template #body="slotProps">
          {{ slotProps.data.stockCount }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Sidebar from 'primevue/sidebar'; // Added import
import ProductDisplay from '@/components/ProductDisplay.vue';

const gameStateManager = inject('gameStateManager');
const selectedCompany = ref(null);
const displaySidebar = ref(false);

const onRowSelect = (event) => {
  if (event.data) { 
    displaySidebar.value = true;
  }
};

const getCitizenName = (citizenId) => {
  if (!citizenId || !gameStateManager || !gameStateManager.citizenManager || !gameStateManager.citizenManager.citizens) {
    return 'N/A';
  }
  const citizen = gameStateManager.citizenManager.citizens.get(citizenId);
  return citizen ? citizen.name : 'Unknown Citizen';
};

const companies = computed(() => {
  if (gameStateManager && gameStateManager.companyManager) {
    return gameStateManager.companyManager.companies.map(comp => ({
      ...comp,
      openJobsCount: typeof comp.getOpenJobs === 'function' ? comp.getOpenJobs().length : 0,
      totalJobsCount: comp.jobs ? comp.jobs.length : 0,
      stockCount: comp.building && comp.building.stockings ? comp.building.stockings.length : 0
    }));
  }
  return [];
});

const showStockColumn = computed(() => {
  return companies.value.some(c => c.building && typeof c.building.stockings !== 'undefined');
});

</script>

<style scoped>
.companies-table {
  width: 100%; /* Make DataTable take full width */
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem; /* PrimeVue's default is often smaller */
  padding: 0.5rem 0; /* Adjust padding as needed */
  font-weight: bold;
}

/* Sidebar specific styling */
:deep(.p-sidebar-md .p-sidebar-header) { /* Use :deep for PrimeVue components if needed */
  padding: 1rem;
}
:deep(.p-sidebar-md .p-sidebar-content) {
  padding: 1rem;
}

h3 { /* For sidebar header */
  margin-top: 0;
  font-size: 1.25rem;
}

h5 { /* For sections within sidebar like "Jobs" */
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 0.25rem;
}

ul.job-list {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0.5rem;
}

ul.job-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  line-height: 1.4;
}

ul.job-list li:last-child {
  border-bottom: none;
}

ul.job-list strong {
  display: block;
  color: #333;
  font-weight: 600; /* Bolder job titles */
}

ul.job-list div { /* For "Occupied by" or "Status" */
  font-size: 0.9em;
  color: #555;
  padding-left: 10px; /* Indent details under job title */
  margin-top: 0.25rem;
}

.job-open {
  color: #28a745; /* Green for open jobs */
  font-weight: bold;
}

/*
.card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
}
*/
</style>
