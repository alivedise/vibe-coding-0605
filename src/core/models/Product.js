import { faker } from "@faker-js/faker";

console.log(faker.definitions.commerce.product_name.material);
console.log(faker.definitions.commerce.product_name.product);

class Product {
  constructor(job) {
    this.id = faker.string.uuid();
    this.carrierId = null;
    this.name = faker.commerce.productName();
    this.product = faker.commerce.product();
    this.material = faker.commerce.productMaterial();
    if (!job) {
      this.producedByJobId = null;
      this.producedByCompanyId = null;
    } else {
      this.producedByJobId = job.id;
      this.producedByCompanyId = job.companyId;
    }
    this.creationDate = new Date();
    // Example: Value could be related to job salary or a random commerce item price
    this.value = faker.commerce.price({ min: 10, max: 200, dec: 2 }); 
    this.color = faker.color.rgb();
    const icons = ['pi pi-box', 'pi pi-gift', 'pi pi-inbox', 'pi pi-database', 'pi pi-briefcase'];
    this.icon = icons[Math.floor(Math.random() * icons.length)];
    // console.log(`New product created: ${this.name} (ID: ${this.id}) by company ${this.producedByCompanyId}`);
  }

  getPrice() {
    return this.value;
  }

  getColor() {
    return this.color;
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
