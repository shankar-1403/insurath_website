import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import LifeInsurance from "@/src/models/LifeInsurance";
import { Types } from "mongoose";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const savedData = await LifeInsurance.create(body);
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
    const { id,full_name,email_id,phone_number,age,gender,city,family_size,income_range,exisitng_life_insurance,health_condition,desired_coverage_amount} = body;
    const updatedData = await LifeInsurance.findByIdAndUpdate(new Types.ObjectId(id),{full_name,email_id,phone_number,age,gender,city,family_size,income_range,exisitng_life_insurance,health_condition,desired_coverage_amount}, { new: true });
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