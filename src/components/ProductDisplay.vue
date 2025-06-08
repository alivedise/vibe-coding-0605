<template>
  <div class="product-display" v-if="item">
    <span class="product-color-swatch" :style="{ backgroundColor: item.color }"></span>
    <i :class="item.icon" class="product-icon"></i>
    <span class="product-name">{{ item.name || 'Unnamed Item' }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({ name: 'N/A', color: '#ccc', icon: 'pi pi-question' })
  }
});
</script>

<style scoped>
.product-display {
  display: flex;
  align-items: center;
  gap: 8px; /* Space between elements */
}

.product-color-swatch {
  width: 20px;
  height: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  flex-shrink: 0; /* Prevent swatch from shrinking */
}

.product-icon {
  font-size: 1.2rem;
  color: #555;
  flex-shrink: 0; /* Prevent icon from shrinking */
}

.product-name {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
