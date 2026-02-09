import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HealthInsurance from "@/src/models/HealthInsurance";
import { Types } from "mongoose";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const savedData = await HealthInsurance.create(body);
    return NextResponse.json({id: savedData._id,full_name:savedData.full_name,email_id:savedData.email_id,phone_number:savedData.phone_number,age:savedData.age,gender:savedData.gender,city:savedData.city, message: "Form submitted successfully"},{ status:200 });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json({ message: "Error submitting form" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const { id,full_name,email_id,phone_number,age,gender,city,coverage_type,existing_health_insurance,pre_existing_conditions,desired_coverage_amount} = body;
    const updatedData = await HealthInsurance.findByIdAndUpdate(new Types.ObjectId(id),{full_name,email_id,phone_number,age,gender,city,coverage_type, existing_health_insurance,pre_existing_conditions,desired_coverage_amount}, { new: true });
    if (!updatedData) {
      return NextResponse.json({ message: "Data not found" }, { status: 404 });
    } else {    
      return NextResponse.json({data: updatedData._id, message: "Form submitted successfully" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error updating form data:", error);
    return NextResponse.json({ message: "Error updating form" }, { status: 500 });
  }
}