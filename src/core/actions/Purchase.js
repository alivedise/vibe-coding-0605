class Purchase {
  constructor(building) {
    this.id = faker.string.uuid();
    this.name = faker.commerce.productName();
    this.price = faker.commerce.price({ min: 10, max: 200, dec: 2 });
    this.color = faker.color.rgb();
    this.building = building;
  }

  execute(owner) {
    const product = this.building.stockings.shift();
    if (!product) {
      return;
    }
    owner.own(product);
    product.carryBy(owner);
  }
}

export default Purchase;
