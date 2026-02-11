import { Schema, model, models } from "mongoose";

const TravelInsurance = new Schema(
  {
    full_name: { type: String, required: true },
    email_id: { type: String, required: true },
    phone_number: { type: String, required: true },
    age: { type: String, required: true },  
    city: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.TravelInsurance || model("TravelInsurance", TravelInsurance);