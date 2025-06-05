class ResourceManager {
    constructor() {
        console.log('ResourceManager initialized');
        this.resources = {};
    }

    update(context) {
        // console.log('ResourceManager update', context);
        // Logic to update resources based on game state
    }

    getData() {
        return this.resources;
    }

    // Add methods to manage resources (e.g., addResource, getResource)
}

export default ResourceManager;
