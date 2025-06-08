<template>
  <div class="fps-trend-chart-container">
    <Chart type="line" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { inject, computed, ref } from 'vue';
import Chart from 'primevue/chart';

const gameStateManager = inject('gameStateManager');

const chartData = computed(() => {
  if (!gameStateManager || !gameStateManager.fpsHistory.value) {
    return {
      labels: [],
      datasets: []
    };
  }

  const history = gameStateManager.fpsHistory.value;
  const labels = history.map(dataPoint => dataPoint.tick.toString()); // Or format as time if preferred
  const fpsValues = history.map(dataPoint => dataPoint.fps);

  return {
    labels: labels,
    datasets: [
      {
        label: 'FPS Over Time',
        data: fpsValues,
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.1
      }
    ]
  };
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Game Tick'
      }
    },
    y: {
      title: {
        display: true,
        text: 'FPS'
      },
      beginAtZero: true,
      // suggestedMax: 65 // Optional: to give some headroom above 60 FPS
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top'
    }
  }
});

</script>

<style scoped>
.fps-trend-chart-container {
  height: 300px; /* Adjust as needed */
  padding: 1rem;
}
</style>
