import { faker } from "@faker-js/faker";

class Product {
  constructor(job) {
    this.id = faker.string.uuid();
    this.name = `Product of ${job.title}`;
    this.producedByJobId = job.id;
    this.producedByCompanyId = job.companyId;
    this.creationDate = new Date();
    // Example: Value could be related to job salary or a random commerce item price
    this.value = faker.commerce.price({ min: 10, max: 200, dec: 2 }); 

    console.log(`New product created: ${this.name} (ID: ${this.id}) by company ${this.producedByCompanyId}`);
  }

  getDetails() {
    return `Product: ${this.name}, Value: $${this.value}, Produced by Job ID: ${this.producedByJobId}, Company ID: ${this.producedByCompanyId}, Created: ${this.creationDate.toLocaleTimeString()}`;
  }
}

export default Product;
