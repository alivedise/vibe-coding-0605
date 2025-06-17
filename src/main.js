import { createApp } from "vue";
import App from "./App.vue";
import GameStateManager from "@/core/managers/GameStateManager";

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);


app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
 });

// Initialize Game State Manager
const gameStateManager = new GameStateManager();
// Potentially initialize other managers within GameStateManager here
// gameStateManager.initializeManagers();

// Provide the gameStateManager to the Vue app if needed, e.g., for UI updates
app.provide("gameStateManager", gameStateManager);

app.mount("#app");
