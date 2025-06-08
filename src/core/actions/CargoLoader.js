class CargoLoader {
  constructor(object) {
    this.object = object;
    this.progress = 0;
    this.maxProgress = 10;
  }

  name = "CargoLoader";

  update(context) {
    this.loadCargo(context);
  }

  loadCargo(context) {
    this.progress += 1;
    if (this.progress >= this.maxProgress) {
      this.object.loadCargo();
      this.object.resetAction();
    }
  }
}