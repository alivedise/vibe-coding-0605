class JobManager {
  constructor() {
    this.jobMap = new Map();
  }

  findJobById(id) {
    return this.jobMap.get(id);
  }

  registerJob(job) {
    this.jobMap.set(job.id, job);
  }

  update(context) {
  }
}

export default JobManager;
