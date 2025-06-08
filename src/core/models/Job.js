import { faker } from "@faker-js/faker";

class Job {
  constructor(company) {
    this.id = faker.string.uuid();
    this.title = faker.person.jobTitle();
    this.company = company; // Link to the company offering the job
    this.companyId = company.id;
    this.description = faker.lorem.sentence();
    this.salary = faker.finance.amount({ min: 30000, max: 150000, dec: 0, symbol: '$' });
    this.requiredSkills = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.company.buzzNoun());
    this.occupied = false;
    this.employeeId = null;
    this.progress = 0;
    // this.maxProgress = Math.floor(Math.random() * 100) + 1;
    this.maxProgress = 3; // debugging purpose
    // Later, we can add things like experienceLevel, employmentType (full-time, part-time), etc.
  }

  isDone() {
    return this.progress >= this.maxProgress;
  }

  resetStatus() {
    this.progress = 0;
  }

  // Example method
  getJobDetails() {
    return `Job: ${this.title} at company ID ${this.companyId}\nSalary: ${this.salary}\nSkills: ${this.requiredSkills.join(', ')}`;
  }

  occupy(citizen) {
    this.occupied = true;
    this.employeeId = citizen.id;
  }

  updateJobProgress() {
    this.progress++;
  }
}

export default Job;
