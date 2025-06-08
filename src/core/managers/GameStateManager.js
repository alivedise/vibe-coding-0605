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

class GameStateManager {
  constructor() {
    console.log("GameStateManager initialized");
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
    window.gameStateManager = this;

    // this.initializeManagers(); // We can directly initialize in constructor for now
  }

  // Main game loop tick
  tick() {
    //console.log("GameStateManager tick");
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
      // Add other relevant game state data here
    };
  }

  // initializeManagers() method can be removed if initialization is done in constructor
}

export default GameStateManager;
