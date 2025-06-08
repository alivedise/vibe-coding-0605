import { faker } from "@faker-js/faker";

class Product {
  constructor(job) {
    this.id = faker.string.uuid();
    this.carrierId = null;
    if (!job) {
      this.name = faker.commerce.productName();
      this.producedByJobId = null;
      this.producedByCompanyId = null;
    } else {
      this.name = `Product of ${job.title}`;
      this.producedByJobId = job.id;
      this.producedByCompanyId = job.companyId;
    }
    this.creationDate = new Date();
    // Example: Value could be related to job salary or a random commerce item price
    this.value = faker.commerce.price({ min: 10, max: 200, dec: 2 }); 

    // console.log(`New product created: ${this.name} (ID: ${this.id}) by company ${this.producedByCompanyId}`);
  }

  getDetails() {
    return `Product: ${this.name}, Value: $${this.value}, Produced by Job ID: ${this.producedByJobId}, Company ID: ${this.producedByCompanyId}, Created: ${this.creationDate.toLocaleTimeString()}`;
  }

  carryBy(carrier) {
    this.carrierId = carrier.id;
    this.carrier = carrier;
  }
}

export default Product;
