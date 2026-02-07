import { Schema, model, models } from "mongoose";

const HomeBannerSchema = new Schema(
  {
    full_name: { type: String, required: true },
    email_id: { type: String, required: true },
    phone_number: { type: String, required: true },
    insurance_type: { type: String, required: true },
    coverage_type: { type: String },
    existing_health_insurance: { type: String },
  },
  { timestamps: true }
);

export default models.HomeContactBanner || model("HomeContactBanner", HomeBannerSchema);