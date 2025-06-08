class StockingManager {
  constructor() {
    this.imports = [];
    this.exports = [];
  }

  update(context) {
    
  }

  findAvailableTile(company) {
    return company.buildings.some((building) => {
      const tile = building.getTile();
      return tile;
    });
  }
}

export default StockingManager;
