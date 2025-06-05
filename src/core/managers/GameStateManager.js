import ResourceManager from './ResourceManager';
import MapManager from './MapManager';
import CitizenManager from './CitizenManager';
import CompanyManager from './CompanyManager';
import VehicleManager from './VehicleManager';
import ProductManager from './ProductManager';
import RecipeManager from './RecipeManager';

class GameStateManager {
    constructor() {
        console.log('GameStateManager initialized');
        this.resourceManager = new ResourceManager();
        this.mapManager = new MapManager();
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
        console.log('GameStateManager tick');
        const context = this.getContext();

        // Update all managers
        this.resourceManager?.update(context);
        this.mapManager?.update(context);
        this.citizenManager?.update(context);
        this.companyManager?.update(context);
        this.vehicleManager?.update(context);
        this.productManager?.update(context);
        this.recipeManager?.update(context);
    }

    // Method to gather context from all managers
    getContext() {
        return {
            resources: this.resourceManager?.getData(),
            map: this.mapManager?.getData(),
            citizens: this.citizenManager?.getData(),
            companies: this.companyManager?.getData(),
            vehicles: this.vehicleManager?.getData(),
            products: this.productManager?.getData(),
            recipes: this.recipeManager?.getData(),
            // Add other relevant game state data here
        };
    }

    // initializeManagers() method can be removed if initialization is done in constructor
}


export default GameStateManager;
