import ResourceManager from "./ResourceManager";
import MapManager from "./MapManager";
import BuildingManager from "./BuildingManager";
import CitizenManager from "./CitizenManager";
import CompanyManager from "./CompanyManager";
import VehicleManager from "./VehicleManager";
import ProductManager from "./ProductManager";
import RecipeManager from "./RecipeManager";
import PathManager from "./PathManager";
import JobManager from "./JobManager";
import CanvasManager from "./CanvasManager";
import ConfigurationManager from "./ConfigurationManager";
import FocusManager from "./FocusManager";
import { ref } from 'vue';

class GameStateManager {
  constructor() {
    console.log("GameStateManager initialized");
    this.lastTimestamp = new Date().getTime();
    this.currentTimestamp = this.lastTimestamp;
    this.isPaused = ref(false);
    this.tickCounter = ref(0);
    this.fpsHistory = ref([]); // For storing FPS data points { tick: number, fps: number }
    this.maxFpsHistoryLength = 200; // Store last 200 FPS readings
    this.resourceManager = new ResourceManager();
    this.mapManager = new MapManager();
    // BuildingManager needs map dimensions and mapData (terrain) for placement logic
    this.buildingManager = new BuildingManager();
    this.pathManager = new PathManager();
    this.jobManager = new JobManager();
    this.citizenManager = new CitizenManager();
    this.companyManager = new CompanyManager();
    this.vehicleManager = new VehicleManager();
    this.productManager = new ProductManager();
    this.recipeManager = new RecipeManager();
    this.canvasManager = new CanvasManager();
    this.configurationManager = new ConfigurationManager();
    this.focusManager = new FocusManager();
    window.gameStateManager = this;

    // this.initializeManagers(); // We can directly initialize in constructor for now
  }

  // Main game loop tick
  tick() {
    if (this.isPaused.value) {
      return;
    }
    //console.log("GameStateManager tick");
    this.lastTimestamp = this.currentTimestamp;
    this.currentTimestamp = new Date().getTime();
    const context = this.getContext();

    // Update all managers
    this.resourceManager?.update(context);
    this.mapManager?.update(context);
    this.buildingManager?.update(context);
    this.citizenManager?.update(context);
    this.companyManager?.update(context);
    this.vehicleManager?.update(context);
    this.productManager?.update(context);
    this.recipeManager?.update(context);
    this.buildingManager?.update(context);
    this.pathManager?.update(context);
    this.jobManager?.update(context);
    this.canvasManager?.update(context);
    this.focusManager?.update(context);

    this.tickCounter.value++;
  }

  addFpsData(fpsValue) {
    this.fpsHistory.value.push({ tick: this.tickCounter.value, fps: fpsValue });
    if (this.fpsHistory.value.length > this.maxFpsHistoryLength) {
      this.fpsHistory.value.shift(); // Remove the oldest entry
    }
  }

  // Method to gather context from all managers
  getContext() {
    return {
      resourceManager: this.resourceManager,
      mapManager: this.mapManager,
      buildingManager: this.buildingManager,
      citizenManager: this.citizenManager,
      companyManager: this.companyManager,
      vehicleManager: this.vehicleManager,
      productManager: this.productManager,
      recipeManager: this.recipeManager,
      pathManager: this.pathManager,
      jobManager: this.jobManager,
      productManager: this.productManager,
      currentTimestamp: this.currentTimestamp,
      lastTimestamp: this.lastTimestamp,
      canvasManager: this.canvasManager,
      configurationManager: this.configurationManager,
      focusManager: this.focusManager,
      // Add other relevant game state data here
    };
  }

  // initializeManagers() method can be removed if initialization is done in constructor

  pauseGame() {
    this.isPaused.value = true;
    console.log("Game paused");
  }

  resumeGame() {
    this.isPaused.value = false;
    console.log("Game resumed");
  }
}

export default GameStateManager;
