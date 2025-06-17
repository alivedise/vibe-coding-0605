class Task {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  async execute() {
    await this.promise;
  }
}

export default Task;