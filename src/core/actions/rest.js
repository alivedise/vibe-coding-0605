class Rest {
  constructor(object) {
    this.object = object;
    this.progress = 0;
    this.progressMax = Math.floor(Math.random() * 100) + 1;
  }

  name = "Rest";

  update(context) {
    this.progress++;
    if (this.progress >= this.progressMax) {
      this.object.resetAction();
    }
  }
}

export default Rest;
  