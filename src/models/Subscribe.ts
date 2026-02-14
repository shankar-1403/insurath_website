import { Schema, model, models } from "mongoose";

const Subscribe = new Schema(
  {
    email_id: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Subscribe || model("Subscribe", Subscribe);