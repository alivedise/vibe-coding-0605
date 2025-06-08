import { faker } from "@faker-js/faker";
import Job from './Job.js';
import Product from '@/core/models/Product.js';

class Company {
  constructor() {
    this.id = faker.string.uuid();
    this.name = faker.company.name();
    this.industry = faker.company.buzzNoun();
    this.jobs = []; // Initialize jobs array
    this.buildingId = null;
    this.stockings = [];

    // Create a random number of initial jobs for the company
    const numberOfJobs = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < numberOfJobs; i++) {
      this.jobs.push(new Job(this));
    }
  }

  update(context) {
    
  }

  releaseProduct(job) {
    this.stockings.push(new Product(job)); 
  }

  // Method for a citizen to apply for a job
  // For now, it just removes the job from the list
  applyJob(citizen) {
    const job = this.jobs.find(job => job.occupied === false);
    if (job) {
      job.occupy(citizen);
      citizen.setJob(job, this);  
      return true; // Job successfully "filled" and removed
    }
    return false; // Job not found
  }

  // Get all currently open jobs
  getOpenJobs() {
    return this.jobs;
  }

  // Updated method to include job count
  getDetails() {
    return `${this.name} (Industry: ${this.industry}) - Open Positions: ${this.jobs.length}`;
  }
}

export default Company;
