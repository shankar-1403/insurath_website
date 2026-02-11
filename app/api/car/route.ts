import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CarInsurance from "@/src/models/CarInsurance";
import { Types } from "mongoose";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const savedData = await CarInsurance.create(body);
    return NextResponse.json({id: savedData._id,full_name:savedData.full_name,email_id:savedData.email_id,phone_number:savedData.phone_number,city:savedData.city, message: "Form submitted successfully"},{ status:200 });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json({ message: "Error submitting form" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const { id,full_name,email_id,phone_number,city,vehicle_name,vehicle_model,manufacturing_year,registration_year,registration_number,exisiting_car_insurance,claim_history,desired_coverage_type} = body;
    const updatedData = await CarInsurance.findByIdAndUpdate(new Types.ObjectId(id),{full_name,email_id,phone_number,city,vehicle_name, vehicle_model,manufacturing_year,registration_year,registration_number,exisiting_car_insurance,claim_history,desired_coverage_type}, { new: true });
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