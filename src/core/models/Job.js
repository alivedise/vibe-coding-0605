import { faker } from "@faker-js/faker";

class Job {
  constructor(companyId) {
    this.id = faker.string.uuid();
    this.title = faker.person.jobTitle();
    this.companyId = companyId; // Link to the company offering the job
    this.description = faker.lorem.sentence();
    this.salary = faker.finance.amount({ min: 30000, max: 150000, dec: 0, symbol: '$' });
    this.requiredSkills = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.company.bsNoun());
    this.occupied = false;
    // Later, we can add things like experienceLevel, employmentType (full-time, part-time), etc.
  }

  // Example method
  getJobDetails() {
    return `Job: ${this.title} at company ID ${this.companyId}\nSalary: ${this.salary}\nSkills: ${this.requiredSkills.join(', ')}`;
  }
}

export default Job;
