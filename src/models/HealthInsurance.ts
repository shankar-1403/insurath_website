import { Schema, model, models } from "mongoose";

const HealthInsurance = new Schema(
  {
    full_name: { type: String, required: true },
    email_id: { type: String, required: true },
    phone_number: { type: String, required: true },
    age: { type: String, required: true },  
    gender: { type: String, required: true },
    city: { type: String, required: true },
    coverage_type: { type: String },
    existing_health_insurance: { type: String },
    pre_existing_conditions: { type: String },
    desired_coverage_amount: { type: String },
  },
  { timestamps: true }
);

export default models.HealthInsurance || model("HealthInsurance", HealthInsurance);