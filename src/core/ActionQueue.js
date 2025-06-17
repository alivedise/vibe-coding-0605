class ActionQueue {
  constructor(target) {
    this.target = target;
    this.queue = [];
    this.active = null;
  }

  enqueue(action) {
    this.queue.push(action);
    return this;
  }

  update(context) {
    if (!this.queue.length) {
      this.target.resetAction();
      return;
    }
    if (this.active) {
      this.active.update(context);
      return;
    } else {
      const action = this.queue.shift();
      if (!action) {
        return;
      }
      this.active = action;
      action.update(context);
    }
  }
}