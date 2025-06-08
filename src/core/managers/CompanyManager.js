import { ref } from "vue";
import Company from "@/core/models/Company";

class CompanyManager {
  constructor() {
    console.log("CompanyManager initialized");
    this.companies = [];
  }

  update(context) {
    // console.log('CompanyManager update', context);
    // Logic to update company states (e.g., production, hiring)
    this.companies.forEach((company) => company.update(context));
    if (this.companies.length < 5 && context.buildingManager.buildings.length > 0) {
      const building = context.buildingManager.getAvailableBuildingForCompany();
      if (building) {
        this.createCompany(building);
      }
    }
  }

  addCompany(company) {
    this.companies.push(company);
  }

  getCompanyById(id) {
    return this.companies.find((company) => company.id === id);
  }

  createCompany(building) {
    const company = new Company(this);
    company.setBuilding(building);
    building.setCompany(company);
    this.addCompany(company);
    return company;
  }
  // Add methods for company creation, industry management, etc.
}

export default CompanyManager;
