import { Schema, model, models } from "mongoose";

const BusinessInsurance = new Schema(
  {
    company_name: { type: String, required: true },
    contact_person: { type: String, required: true },
    email_id: { type: String, required: true },
    phone_number: { type: String, required: true },  
    business_type: { type: String, required: true },
    industry: { type: String, required: true },
    annual_revenue: { type: String, required:true },
    number_of_employees: { type: String, required:true },
    existing_business_insurance: { type: String },
    primary_coverage_type: { type: String },
    estimated_property_value: { type: String },
    liability_coverage_needs: { type: String },
    cyber_security_coverage: { type: String },
    priority_coverage_area: { type: String },
  },
  { timestamps: true }
);

export default models.BusinessInsurance || model("BusinessInsurance", BusinessInsurance);