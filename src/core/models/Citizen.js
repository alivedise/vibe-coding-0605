import { faker } from "@faker-js/faker";
import Rest from "@/core/actions/rest";
import Move from "@/core/models/Move"; // Note: Move model might be an action, or require different instantiation
import Work from "@/core/actions/Work";
import Purchase from "@/core/actions/Purchase";
import { BUILDING_TYPES } from "@/constants/buildingTypes";

const MOODS = ['Happy', 'Neutral', 'Sad', 'Stressed', 'Content'];
const EDUCATION_LEVELS = ['None', 'High School', 'College', 'Graduate'];

class Citizen {
  constructor() {
    this.id = faker.string.uuid();
    this.name = faker.person.fullName();
    this.age = faker.number.int({ min: 18, max: 65 }); // Age range for working population
    this.gender = faker.person.sex();
    this.mood = MOODS[Math.floor(Math.random() * MOODS.length)];
    this.educationLevel = EDUCATION_LEVELS[Math.floor(Math.random() * EDUCATION_LEVELS.length)];

    // Job-related properties
    this.occupation = "Unemployed"; // Start as unemployed
    this.jobId = null;
    this.companyId = null;
    this.isLookingForJob = true;
    this.skills = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => faker.company.buzzNoun());

    // Reactive pixel coordinates for smooth animation - initialized in CitizenManager
    this.x = 0;
    this.y = 0;
    // Tile and Building IDs
    this.currentTile = null;
    this.action = null;
    this.targetTile = null;
    this.homeBuildingId = null;
    this.workBuildingId = null; // Will be set when a job at a company with a building is taken
    this.path = [];
    this.currentPathIndex = 0;
    this.color = faker.color.rgb();
    this.belongings = [];
    this.money = 1000;
    this.speed = 1; // Default speed
  }

  getTile() {
    return this.currentTile;
  }

  findResidence(context) {
    if (this.homeBuildingId) {
      return;
    }
    const randomBuilding = context.buildingManager.getAvailableBuilding(BUILDING_TYPES.RESIDENTIAL);
    this.homeBuildingId = randomBuilding.id;
    randomBuilding.moveIn(this);
  }

  own(product) {
    this.belongings.push(product);
    this.money -= product.getPrice();
  }

  getColor() {
    return this.color;
  }

  getInfo() {
    return (
      `ID: ${this.id}, Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}, ` +
      `Mood: ${this.mood}, Education: ${this.educationLevel}, ` +
      `Occupation: ${this.occupation}${this.companyId ? ` (Company ID: ${this.companyId})` : ''}, ` +
      `Skills: ${this.skills.join(', ')}, Looking for job: ${this.isLookingForJob}, ` +
      `Pos: (${typeof this.x === 'number' ? this.x.toFixed(1) : this.x}, ${typeof this.y === 'number' ? this.y.toFixed(1) : this.y})`
    );
  }

  resetAction(actionName) {
    this.action = null;
    if (actionName === "Work") {
      const job = this.context.jobManager?.findJobById(this.jobId);
      if (!job) {
        console.error(`Citizen ${this.name} is working but cannot find job ${this.jobId}`);
        return;
      }
      job.updateJobProgress();
      this.money += job.getSalary();
    }
  }

  setJob(job, company) {
    this.jobId = job.id;
    this.companyId = company.id;
    this.occupation = job.title;
    this.isLookingForJob = false;
    // Assuming company objects might have a buildingId property
    this.workBuildingId = company.buildingId || null; 
    // console.log(`${this.name} accepted job: ${job.title} at ${company.name}. WorkBuildingId: ${this.workBuildingId}`);
  }

  quitJob(context) {
    if (this.companyId && this.jobId) {
      // Optionally, notify the company or JobManager that the job is open again.
      // For now, the job was removed from the company's list when taken.
      // If we want it to reappear, the company would need a method to re-list it,
      // or JobManager would handle it.
      // Example: context.companyManager.findCompanyById(this.companyId)?.reOpenJob(this.jobId);
      // console.log(`${this.name} quit job: ${this.occupation} at company ${this.companyId}`);
    }
    this.occupation = "Unemployed";
    this.jobId = null;
    this.companyId = null;
    this.isLookingForJob = true;
    this.workBuildingId = null;
  }

  lookForWork(context) {
    if (!context || !context.companyManager) {
      console.warn("Citizen: Cannot look for work, companyManager not in context.");
      return;
    }

    const companies = context.companyManager.companies; // Assuming companies is a ref
    for (const company of companies) {
      const openJobs = company.getOpenJobs();
      // randomize the order of the jobs
      openJobs.sort(() => Math.random() - 0.5);
      for (const job of openJobs) {
        // Attempt to apply for the job
        if (company.applyJob(this)) { // applyJob in Company.js removes the job and returns true
          this.setJob(job, company);
          return; // Found and took a job
        }
      }
    }
    // console.log(`${this.name} could not find a suitable job this cycle.`);
  }

  update(context) {
    if (!this.context) {
      this.context = context;
      // XXX: storing context might be a bad idea. Refine this later.
    }
    if (this.isLookingForJob && !this.action) {
      this.lookForWork(context);
      // If a job was found, isLookingForJob is now false.
      // Future: Citizen might decide to go to work.
    }

    this.findResidence(context);

    if (!this.action) {
      // TODO: Action selection needs refinement.
      // The current Move action instantiation might be incorrect based on Move model/action definition.
      // For now, keeping existing logic.
      const actions = [Move, Rest, Purchase];
      if (this.jobId) {
        actions.push(Work);
      }
      
      const ActionClass = actions[Math.floor(Math.random() * actions.length)];
      
      // Placeholder for more complex action instantiation if needed
      if (ActionClass === Move) {
          this.action = new ActionClass(this, context.mapManager.getRandomTile()); // Example, might not be correct
      } else {
          this.action = new ActionClass(this);
      }

      if (!this.action) return; // If action couldn't be created
    }
    
    if (this.action) {
      this.action.update(context);
    }
  }
}

export default Citizen;
