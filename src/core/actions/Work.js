class Work {
  constructor(object) {
    this.object = object;
    this.progress = 0;
    this.maxProgress = Math.floor(Math.random() * 100) + 1;
  }

  name = "Work";

  update() {
    this.progress++;
    if (this.progress >= this.maxProgress) {
      this.object.resetAction(this.name);
    }
  }
}

export default Work;
