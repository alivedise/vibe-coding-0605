<template>
  <div class="citizen-table-container">
    <Sidebar v-model:visible="displaySidebar" position="right" class="p-sidebar-md">
      <template #header>
        <h3>Citizen Details</h3>
      </template>
      <div v-if="selectedCitizen">
        <p><strong>ID:</strong> {{ selectedCitizen.id }}</p>
        <p><strong>Name:</strong> {{ selectedCitizen.name }}</p>
        <p><strong>Age:</strong> {{ selectedCitizen.age }}</p>
        <p><strong>Occupation:</strong> {{ selectedCitizen.occupation || 'N/A' }}</p>
        <p><strong>Money:</strong> ${{ selectedCitizen.money.toFixed(2) }}</p>
        <p><strong>Action:</strong> {{ selectedCitizen.action?.name || 'Idle' }}</p>
        <p><strong>Current Tile ID:</strong> {{ selectedCitizen.currentTile?.id || 'N/A' }}</p>
        <p><strong>Target Tile ID:</strong> {{ selectedCitizen.targetTile?.id || 'N/A' }}</p>
        <p><strong>Skills:</strong> {{ selectedCitizen.skills.join(', ') }}</p>
        
                <h5>Belongings:</h5>
        <ul v-if="selectedCitizen.belongings && selectedCitizen.belongings.length > 0">
          <li v-for="item in selectedCitizen.belongings" :key="item.id">
            {{ item.name }} (Value: ${{ item.value }})
          </li>
        </ul>
        <p v-else>No belongings.</p>
      </div>
    </Sidebar>
    <DataTable
      :value="citizens"
      selectionMode="single"
      v-model:selection="selectedCitizenForTable"
      @row-select="onRowSelect"
      :paginator="true"
      :rows="10"
      responsiveLayout="scroll"
      stripedRows
      dataKey="id"
    >
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
import { inject, ref } from 'vue';
import Sidebar from 'primevue/sidebar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const gameStateManager = inject('gameStateManager');

const citizens = gameStateManager.citizenManager.citizens;
const selectedCitizen = ref(null); // For the sidebar
const selectedCitizenForTable = ref(null); // For DataTable v-model:selection
const displaySidebar = ref(false);

const onRowSelect = (event) => {
  selectedCitizen.value = event.data; // event.data is the selected row data
  displaySidebar.value = true;
};

const closeSidebar = () => {
  displaySidebar.value = false;
  selectedCitizen.value = null;
  selectedCitizenForTable.value = null; // Clear table selection as well
};

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
