<template>
  <div class="citizen-list-container">
    <h3>Citizens ({{ gameStateManager.citizenManager.citizens.length }})</h3>
    <div v-if="gameStateManager.citizenManager.citizens.value.length === 0" class="no-citizens">No citizens yet.</div>
    <ul v-else class="citizen-list">
      <li v-for="citizen in gameStateManager.citizenManager.citizens.value" :key="citizen.id" class="citizen-item">
        <strong>{{ citizen.name }}</strong> ({{
          citizen.gender?.charAt(0).toUpperCase()
        }}, {{ citizen.age }})
        <br />
        ID: <span class="citizen-id">{{ citizen.id?.substring(0, 8) }}</span>
        <br />
        Occupation: {{ citizen.occupation }}
        <br />
        Mood: {{ citizen.mood }}
        <br />
        Education: {{ citizen.educationLevel }}
        <br />
        Position: ({{ citizen.x }}, {{ citizen.y }})
        <br />
        Current Path Index: {{ citizen.currentPathIndex }}
        <br />
        Current Path: {{ citizen.path.length }}
        <br />
        Target Tile ID:
        <span class="citizen-id">{{
          citizen.targetTile?.id?.substring(0, 8)
            ? citizen.targetTile.id.substring(0, 8)
            : "N/A"
        }}</span>
        <br />
        Home ID:
        <span class="citizen-id">{{
          citizen.homeBuildingId
            ? citizen.homeBuildingId.substring(0, 8)
            : "N/A"
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { inject } from "vue";

const gameStateManager = inject("gameStateManager");
</script>

<style scoped>
.citizen-list-container {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.citizen-list-container h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.no-citizens {
  color: #777;
  font-style: italic;
}

.citizen-list {
  list-style-type: none;
  padding: 0;
}

.citizen-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 0.9em;
  line-height: 1.4;
}

.citizen-item strong {
  color: #007bff;
  font-size: 1.1em;
}

.citizen-id {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.85em;
  color: #555;
}
</style>
