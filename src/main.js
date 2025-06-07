import { createApp } from "vue";
import App from "./App.vue";
import GameStateManager from "@/core/managers/GameStateManager";

import "./assets/main.css"; // We'll create this later for global styles

const app = createApp(App);

// Initialize Game State Manager
const gameStateManager = new GameStateManager();
// Potentially initialize other managers within GameStateManager here
// gameStateManager.initializeManagers();

// Provide the gameStateManager to the Vue app if needed, e.g., for UI updates
app.provide("gameStateManager", gameStateManager);

app.mount("#app");

// Basic game loop
function gameLoop(timestamp) {
  gameStateManager.tick(timestamp);
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
