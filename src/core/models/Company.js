class Company {
  constructor(id, name, industry) {
    this.id = id;
    this.name = name;
    this.industry = industry;
    // We can add more properties later, like employees, products, location, etc.
  }

  // Example method
  getDetails() {
    return `${this.name} (Industry: ${this.industry})`;
  }
}

export default Company;
