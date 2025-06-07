import { markRaw, ref } from "vue";
import { faker } from "@faker-js/faker";


const MOODS = ['Happy', 'Neutral', 'Sad', 'Stressed', 'Content'];
const EDUCATION_LEVELS = ['None', 'High School', 'College', 'Graduate'];

class Citizen {
  constructor() { 
    this.id = faker.string.uuid();
    this.name = faker.person.fullName();
    this.age = faker.number.int({ min: 0, max: 100 });
    this.gender = faker.person.sex();
    this.occupation = faker.person.jobTitle();
    this.mood = MOODS[Math.floor(Math.random() * MOODS.length)];
    this.educationLevel = EDUCATION_LEVELS[Math.floor(Math.random() * EDUCATION_LEVELS.length)];

    // Reactive pixel coordinates for smooth animation - initialized in CitizenManager
    this.x = 0;
    this.y = 0;
    // Tile and Building IDs
    this.currentTile = null; // Stores the Tile object citizen is currently on
    this.currentAction = null;
    this.targetTile = null; // Stores the target Tile object
    this.homeBuildingId = null;
    this.workBuildingId = null;
    this.path = []; // Will store a Path object or null
    this.currentPathIndex = 0;
  }

  move(context) {
    // Ensure citizen has a current tile. If not, try to place them or log error.
    if (!this.currentTile) {
      this.currentTile = context.mapManager.getRandomTile();
      return;
    }
    if (!this.targetTile) {
      this.targetTile = context.mapManager.getRandomTile();
      if (this.targetTile.id === this.currentTile.id) {
        this.targetTile = null;
        return;
      }
      return;
    }
    if (!this.path.length) {
      this.path = context.pathManager.findPath(this.currentTile.id, this.targetTile.id);
      //console.log(`Citizen ${this.id} found path:`, this.path);
      return;
    }
    this.currentPathIndex++;
    if (this.currentPathIndex >= this.path.length) {
      this.currentPathIndex = 0;
      this.path = [];
      this.currentTile = this.targetTile;
      this.targetTile = null;
      return;
    }
    const point = this.path[this.currentPathIndex];
    this.x = point.x;
    this.y = point.y;
  }

  getInfo() {
    return (
      `ID: ${this.id}, Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}, ` +
      `Occupation: ${this.occupation}, Mood: ${this.mood}, Education: ${this.educationLevel}, ` +
      `Pos: (${this.x.toFixed(1)}, ${this.y.toFixed(1)})`
    );
  }

  decideWhereToGo(context) {
    const randomTarget = context.mapManager.getRandomTile();
    if (!randomTarget) {
      // console.warn(`Citizen ${this.id} could not find a random tile to target.`);
      this.targetTile = null;
      this.path = [];
      return;
    }
    this.targetTile = randomTarget;
  }

  update(context) {
    if (!this.currentAction) {
      this.currentAction = 'move';
      this.move(context);
    } else if (this.currentAction === 'move') {
      this.move(context);
    }
  } // This is the correct closing brace for the update method.
}

export default Citizen;
