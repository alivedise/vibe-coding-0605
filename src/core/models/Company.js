import { faker } from "@faker-js/faker";
import Job from './Job.js';
import Product from '@/core/models/Product.js';
import Vehicle from '@/core/models/Vehicle.js';

class Company {
  constructor(manager) {
    this.id = faker.string.uuid();
    this.name = faker.company.name();
    this.industry = faker.company.buzzNoun();
    this.jobs = []; // Initialize jobs array
    this.building = null;
    this.buildingId = null;
    this.buildings = []; // prepare for multiple buildings
    this.stockings = [];
    this.restockings = [];
    this.vehicles = [];
    this.manager = manager;
    this.color = faker.color.rgb();
  }

  getTile() {
    return this.building.tile;
  }

  getLocation() {
    if (!this.building) {
      return null;
    }
    return this.building.tile.getLocation();
  }

  setBuilding(building) {
    this.building = building;
    this.buildingId = building.id;
    this.buildings.push(building);
  }

  update(context) {
    if (!this.context) {
      this.context = context;
    }
    if (this.jobs.length < context.configurationManager.MAX_JOB_PER_COMPANY) {
      const job = new Job(this);
      context.jobManager.registerJob(job);
      this.jobs.push(job);
    }
    this.jobs.forEach(job => {
      if (job.isDone()) {
        job.resetStatus();
        this.releaseProduct(context, job);
      }
    });
    if (this.vehicles.length < context.configurationManager.MAX_VEHICLE_PER_COMPANY) {
      const vehicle = new Vehicle(this);
      vehicle.currentTile = this.building.tile;
      context.vehicleManager.registerInstance(vehicle);
      this.vehicles.push(vehicle);
    }
    this.vehicles.forEach(vehicle => {
      if (!vehicle.action && this.building.stockings.length > 0) {
        // console.log('Vehicle is delivering');
        const seekingForDeliveryTarget = context.companyManager.getRandomCompany();
        if (seekingForDeliveryTarget.id === this.id) {
          // console.log('Vehicle is delivering to itself');
          return;
        }
        vehicle.deliver(seekingForDeliveryTarget.building.tile, this.building.tile);
      }
    });
  }

  releaseProduct(context, job) {
    const product = new Product(job);
    context.productManager.registerProduct(product);
    this.building.storeStocking(product);
  }

  restock(material) {
    this.restockings.push(material);
  }

  // Method for a citizen to apply for a job
  // For now, it just removes the job from the list
  applyJob(citizen) {
    const job = this.jobs.find(job => job.employeeId === null);
    if (job) {
      job.occupy(citizen);
      citizen.setJob(job, this);
      return true; // Job successfully "filled" and removed
    }
    return false; // Job not found
  }

  // Get all currently open jobs
  getOpenJobs() {
    return this.jobs.filter(job => job.employeeId === null);
  }

  // Updated method to include job count
  getDetails() {
    return `${this.name} (Industry: ${this.industry}) - Open Positions: ${this.jobs.length}`;
  }
}

export default Company;
