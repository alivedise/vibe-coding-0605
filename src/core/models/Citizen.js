import { faker } from "@faker-js/faker";
import Rest from "@/core/actions/rest";
import Move from "@/core/models/Move";

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
    this.action = null;
    this.targetTile = null; // Stores the target Tile object
    this.homeBuildingId = null;
    this.workBuildingId = null;
    this.path = []; // Will store a Path object or null
    this.currentPathIndex = 0;
  }

  getInfo() {
    return (
      `ID: ${this.id}, Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}, ` +
      `Occupation: ${this.occupation}, Mood: ${this.mood}, Education: ${this.educationLevel}, ` +
      `Pos: (${this.x.toFixed(1)}, ${this.y.toFixed(1)})`
    );
  }

  resetAction() {
    this.action = null;
  }

  update(context) {
    if (!this.action) {
      // choose action from the list
      const actions = [Move, Rest];
      const Action = actions[Math.floor(Math.random() * actions.length)];
      this.action = new Action(this);
      return;
    }
    this.action.update(context);
  } // This is the correct closing brace for the update method.
}

export default Citizen;
