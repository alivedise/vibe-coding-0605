<template>
  <div class="card">
    <Sidebar v-model:visible="displaySidebar" position="right" class="p-sidebar-md">
      <template #header>
        <h3>Product Details</h3>
      </template>
      <div v-if="selectedProduct">
        <p><strong>ID:</strong> {{ selectedProduct.id }}</p>
        <p><strong>Name:</strong> {{ selectedProduct.name }}</p>
        <p><strong>Value:</strong> ${{ selectedProduct.value }}</p>
        <div class="product-visuals">
          <div class="product-color-swatch" :style="{ backgroundColor: selectedProduct.color }"></div>
          <i :class="selectedProduct.icon" style="font-size: 1.5rem; margin-left: 10px;"></i>
        </div>
        <p><strong>Produced by Company ID:</strong> {{ selectedProduct.producedByCompanyId ? selectedProduct.producedByCompanyId.substring(0,8) + '...' : 'N/A' }}</p>
        <p><strong>Produced by Job ID:</strong> {{ selectedProduct.producedByJobId ? selectedProduct.producedByJobId.substring(0,8) + '...' : 'N/A' }}</p>
        <p><strong>Carrier ID:</strong> {{ selectedProduct.carrierId ? selectedProduct.carrierId.substring(0,8) + '...' : 'N/A' }}</p>
        <p><strong>Created:</strong> {{ new Date(selectedProduct.creationDate).toLocaleString() }}</p>
      </div>
    </Sidebar>
    <h5>Products in Stock</h5>
    <DataTable :value="allProducts"
      selectionMode="single"
      v-model:selection="selectedProductForTable"
      @row-select="onRowSelect" responsiveLayout="scroll" :paginator="true" :rows="10">
      <Column field="id" header="ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.id.substring(0, 8) }}...
        </template>
      </Column>
      <Column header="Name" :sortable="true">
        <template #body="slotProps">
          <ProductDisplay :item="slotProps.data" />
        </template>
      </Column>
      <Column field="value" header="Value" :sortable="true">
        <template #body="slotProps">
          ${{ slotProps.data.value }}
        </template>
      </Column>
      <Column field="companyName" header="Produced by Company" :sortable="true"></Column>
      <Column field="carrierId" header="Carrier ID" :sortable="true">
        <template #body="slotProps">
          {{ slotProps.data.carrierId?.substring(0,8) }}...
        </template>
      </Column>
      <Column field="product" header="Product" :sortable="true"></Column>
      <Column field="material" header="Material" :sortable="true"></Column>
      <Column field="creationDate" header="Created" :sortable="true">
        <template #body="slotProps">
          {{ new Date(slotProps.data.creationDate).toLocaleTimeString() }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import Sidebar from 'primevue/sidebar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProductDisplay from '@/components/ProductDisplay.vue';

const gameStateManager = inject('gameStateManager');

const allProducts = gameStateManager.productManager.products;
const selectedProduct = ref(null);
const selectedProductForTable = ref(null);
const displaySidebar = ref(false);

const onRowSelect = (event) => {
  selectedProduct.value = event.data;
  displaySidebar.value = true;
};

</script>

<style scoped>
.product-visuals {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.product-color-swatch {
  width: 24px;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
}
</style>
