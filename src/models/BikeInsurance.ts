import { Schema, model, models } from "mongoose";

const BikeInsurance = new Schema(
  {
    full_name: { type: String, required: true },
    email_id: { type: String, required: true },
    phone_number: { type: String, required: true },
    city: { type: String, required: true },
    bike_name: { type: String },
    bike_model: { type: String },
    manufacturing_year: { type: String },
    registration_number: { type: String },
    exisiting_bike_insurance: { type: String },
    claim_history: { type: String },
    desired_coverage_type: { type: String },
  },
  { timestamps: true }
);

export default models.BikeInsurance || model("BikeInsurance", BikeInsurance);