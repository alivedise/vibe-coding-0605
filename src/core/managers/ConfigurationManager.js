const SMALL_MAP = {
  MAX_CITIZENS: 10,
  MAX_COMPANIES: 15,
  MAX_JOBS: 10,
  MAX_PRODUCTS: 10,
  MAX_VEHICLES: 15,
  MAX_VEHICLE_PER_COMPANY: 5,
  MAX_JOB_PER_COMPANY: 5,
  MAX_BUILDINGS: 20,
  MAP_WIDTH: 5,
  MAP_HEIGHT: 5,
  TILE_SIZE: 20,
};

const MEDIUM_MAP = {
  MAX_CITIZENS: 100,
  MAX_COMPANIES: 150,
  MAX_JOBS: 100,
  MAX_PRODUCTS: 100,  
  MAX_VEHICLES: 150,
  MAX_VEHICLE_PER_COMPANY: 5,
  MAX_JOB_PER_COMPANY: 5,
  MAX_BUILDINGS: 200,
  MAP_WIDTH: 10,
  MAP_HEIGHT: 10,
  TILE_SIZE: 20,
};

class ConfigurationManager {
  constructor() {
    this.MAX_CITIZENS = 25;
    this.MAX_COMPANIES = 25;
    this.MAX_JOBS = 10;
    this.MAX_PRODUCTS = 10;
    this.MAX_VEHICLES = 15;
    this.MAX_VEHICLE_PER_COMPANY = 5;
    this.MAX_JOB_PER_COMPANY = 5;
    this.MAX_BUILDINGS = 25;
    this.MAP_WIDTH = 15;
    this.MAP_HEIGHT = 7;
    this.TILE_SIZE = 20;
    this.DISPLAY_MONEY = false;
    this.DISPLAY_STOCKINGS = false;
    this.DISPLAY_ACTION = false;
    this.DISPLAY_BELONGING_COUNT = false;
    this.DISPLAY_VEHICLE_OWNER_ID = false;
  }

  update() {

  }
}

export default ConfigurationManager;
