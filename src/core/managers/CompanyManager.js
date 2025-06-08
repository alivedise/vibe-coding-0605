import { ref } from "vue";
import Company from "@/core/models/Company";

class CompanyManager {
  constructor() {
    console.log("CompanyManager initialized");
    this.companies = ref([]);
  }

  update(context) {
    // console.log('CompanyManager update', context);
    // Logic to update company states (e.g., production, hiring)
    this.companies.value.forEach((company) => company.update(context));
    if (this.companies.value.length < 5 && context.buildingManager.buildings.value.length > 0) {
      const building = context.buildingManager.getAvailableBuildingForCompany();
      if (building) {
        this.createCompany(building.id);
      }
    }
  }

  addCompany(company) {
    this.companies.value.push(company);
  }

  createCompany(buildingId) {
    const company = new Company();
    company.buildingId = buildingId;
    this.addCompany(company);
    return company;
  }
  // Add methods for company creation, industry management, etc.
}

export default CompanyManager;
