import { Schema, model, models } from "mongoose";

const Contact = new Schema(
  {
    full_name: { type: String, required: true },
    email_id: { type: String, required: true },
    phone_number: { type: String, required: true },
    insurance_type: { type: String, required: true },  
    message: { type: String, required: true },
    communication_preference: { type: String },
  },
  { timestamps: true }
);

export default models.Contact || model("Contact", Contact);