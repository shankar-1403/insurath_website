import { Schema, model, models } from "mongoose";

const LifeInsurance = new Schema(
  {
    full_name: { type: String, required: true },
    email_id: { type: String, required: true },
    phone_number: { type: String, required: true },
    age: { type: String, required: true },  
    gender: { type: String, required: true },
    city: { type: String, required: true },
    family_size: { type: String },
    income_range: { type: String },
    exisitng_life_insurance: { type: String },
    health_condition: { type: String },
    desired_coverage_amount: { type: String },
  },
  { timestamps: true }
);

export default models.LifeInsurance || model("LifeInsurance", LifeInsurance);