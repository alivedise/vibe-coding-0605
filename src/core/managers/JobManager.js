class JobManager {
  constructor() {
    this.jobs = [];
    this.jobMap = new Map();
  }

  findJobById(id) {
    return this.jobMap.get(id);
  }

  registerJob(job) {
    this.jobMap.set(job.id, job);
    this.jobs.push(job);
  }

  update(context) {
  }
}

export default JobManager;
