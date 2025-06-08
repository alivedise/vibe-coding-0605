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
  }

  update(context) {
    context.companyManager.companies.value.forEach(company => {
      company.jobs.forEach((job) => {
        if (!this.jobMap.has(job.id)) {
          this.jobMap.set(job.id, job);
        }
      });
    });
  }
}

export default JobManager;
