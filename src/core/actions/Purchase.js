class Purchase {
  constructor(object) {
    this.progress = 0;
    this.max = Math.floor(Math.random() * 100) + 1;
    this.object = object;
  }

  name = "Purchase";

  execute(owner) {
    const product = this.object.currentTile?.fetchStocking();
    if (!product) {
      return;
    }
    owner.own(product);
    product.carryBy(owner);
  }

  update() {
    this.progress += 1;
    if (this.progress >= this.max) {
      this.execute(this.object);
      this.object.resetAction();
    } 
  }
}

export default Purchase;
