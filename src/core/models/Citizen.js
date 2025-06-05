import { faker } from '@faker-js/faker';
import { TERRAIN_TYPES } from '@/constants/terrainTypes';

const MOODS = ['Happy', 'Neutral', 'Sad', 'Stressed', 'Content'];
const EDUCATION_LEVELS = ['None', 'High School', 'College', 'Graduate'];

class Citizen {
    constructor(id, name, age, gender, occupation, mood, educationLevel) {
        this.id = id || faker.string.uuid();
        this.name = name || faker.person.fullName();
        this.age = age || faker.number.int({ min: 0, max: 100 });
        this.gender = gender || faker.person.sex();
        this.occupation = occupation || faker.person.jobTitle(); // Can be 'Unemployed' initially
        this.mood = mood || MOODS[Math.floor(Math.random() * MOODS.length)];
        this.educationLevel = educationLevel || EDUCATION_LEVELS[Math.floor(Math.random() * EDUCATION_LEVELS.length)];
        
        this.x = 0; // Map coordinates, to be updated
        this.y = 0; // Map coordinates, to be updated
        this.homeBuildingId = null;
        this.workBuildingId = null;

        // Properties for smooth movement
        this.isMoving = false;
        this.originGridX = 0;
        this.originGridY = 0;
        this.targetGridX = 0;
        this.targetGridY = 0;
        this.movementProgress = 0; // 0 to 1
        this.movementTicksTotal = 4; // e.g., move takes 4 game ticks (0.25 progress per tick)
    }

    getInfo() {
        return (
            `ID: ${this.id}, Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}, ` +
            `Occupation: ${this.occupation}, Mood: ${this.mood}, Education: ${this.educationLevel}, ` +
            `Position: (${this.x}, ${this.y})`
        );
    }

    // Citizen behavior
    update(context) {
        console.log(`[Citizen.js DEBUG] ${this.name} at (${this.x}, ${this.y}) update START`);

        // Smooth movement logic
        if (this.isMoving) {
            this.movementProgress += 1 / this.movementTicksTotal;
            console.log(`[Citizen.js SMOOTH] ${this.name} progress: ${this.movementProgress.toFixed(2)} towards (${this.targetGridX},${this.targetGridY})`);

            if (this.movementProgress >= 1) {
                this.x = this.targetGridX;
                this.y = this.targetGridY;
                this.isMoving = false;
                this.movementProgress = 0;
                console.log(`[Citizen.js SMOOTH] ${this.name} ARRIVED at (${this.x}, ${this.y})`);
            }
        } else {
            // Attempt to start a new move
            const MOVEMENT_PROBABILITY = 0.3; // 30% chance to decide to move each tick
            if (Math.random() < MOVEMENT_PROBABILITY) {
            const directions = [
                { dx: 0, dy: -1 }, // Up
                { dx: 0, dy: 1 },  // Down
                { dx: -1, dy: 0 }, // Left
                { dx: 1, dy: 0 }   // Right
            ];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            
            const nextX = this.x + randomDirection.dx;
            const nextY = this.y + randomDirection.dy;
            // console.log(`Citizen ${this.name} (at ${this.x.value},${this.y.value}) attempting move to (${nextX},${nextY})`);

            const canMove = this.isValidMove(nextX, nextY, context);
                console.log(`[Citizen.js DEBUG] ${this.name} attempting move from (${this.x},${this.y}) to (${nextX},${nextY}). Valid: ${canMove}`);
                if (canMove) {
                // Instead of instantly setting position, initiate smooth move:
                this.isMoving = true;
                this.movementProgress = 0;
                this.originGridX = this.x;
                this.originGridY = this.y;
                this.targetGridX = nextX;
                this.targetGridY = nextY;
                console.log(`[Citizen.js SMOOTH] ${this.name} STARTING move from (${this.originGridX},${this.originGridY}) to (${this.targetGridX},${this.targetGridY})`);
                // Note: this.x and this.y (current grid cell) don't change until arrival.
            } else {
                // console.log(`[Citizen.js DEBUG] ${this.name} FAILED to move to (${nextX},${nextY}). Current: (${this.x},${this.y})`); // Less verbose now
                console.log(`[Citizen.js SMOOTH] ${this.name} FAILED to find valid move from (${this.x},${this.y}) to (${nextX},${nextY})`);
            }
        }

                }
        // Other updates like aging, mood changes, etc. can go here
    }

    isValidMove(x, y, context) {
        if (!context || !context.map || !context.map.value || !context.map.value.grid || !context.map.value.buildings) {
            console.log(`[isValidMove DEBUG] ${this.name}: Context or map data missing for move to (${x},${y})`);
            return false;
        }

        const { grid, buildings, width, height } = context.map.value;

        // 1. Check map boundaries
        if (x < 0 || x >= width || y < 0 || y >= height) {
            console.log(`[isValidMove DEBUG] ${this.name}: FAILED - Out of bounds (${x},${y}). Map size: ${width}x${height}`);
            return false;
        }

        // 2. Check terrain type (e.g., cannot move into WATER)
        const terrainType = grid[y][x].type;
        if (terrainType === TERRAIN_TYPES.WATER) {
            console.log(`[isValidMove DEBUG] ${this.name}: FAILED - Water at (${x},${y})`);
            return false;
        }

        // 3. Check for building collision
        // A simple check: is the target cell (x,y) part of any building's footprint?
        for (const building of buildings) {
            if (x >= building.x && x < building.x + building.width &&
                y >= building.y && y < building.y + building.height) {
                console.log(`[isValidMove DEBUG] ${this.name}: FAILED - Building collision at (${x},${y}) with building ${building.id}`);
                return false; // Collides with a building
            }
        }

        console.log(`[isValidMove DEBUG] ${this.name}: SUCCESS - Valid move to (${x},${y})`);
        return true;
    }

    setPosition(x, y) {
        console.log(`[Citizen.js DEBUG setPosition] ${this.name} changing pos from (${this.x},${this.y}) to (${x},${y})`);
        this.x = x;
        this.y = y;
    }
}

export default Citizen;
