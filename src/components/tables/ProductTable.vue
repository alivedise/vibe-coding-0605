<template>
  <div class="card">
    <h5>Products in Stock</h5>
    <DataTable :value="allProducts" responsiveLayout="scroll" :paginator="true" :rows="10">
      <Column field="id" header="ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.id.substring(0, 8) }}...
        </template>
      </Column>
      <Column field="name" header="Name" :sortable="true"></Column>
      <Column field="value" header="Value" :sortable="true">
        <template #body="slotProps">
          ${{ slotProps.data.value }}
        </template>
      </Column>
      <Column field="companyName" header="Produced by Company" :sortable="true"></Column>
      <Column field="producedByJobId" header="Job ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.producedByJobId?.substring(0,8) }}...
        </template>
      </Column>
      <Column field="creationDate" header="Created" :sortable="true">
        <template #body="slotProps">
          {{ new Date(slotProps.data.creationDate).toLocaleTimeString() }}
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

const allProducts = computed(() => {
  if (gameStateManager && gameStateManager.productManager && gameStateManager.productManager.products.value && gameStateManager.companyManager) {
    return gameStateManager.productManager.products.value.map(product => {
      let companyName = 'N/A';
      if (product.producedByCompanyId) {
        const company = gameStateManager.companyManager.getCompanyById(product.producedByCompanyId);
        if (company) {
          companyName = company.name;
        }
      }
      return {
        ...product,
        companyName: companyName,
      };
    });
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
