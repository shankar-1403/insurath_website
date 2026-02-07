import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { Types } from "mongoose";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const savedData = await Contact.create(body);
    return NextResponse.json({id: savedData._id,full_name:savedData.full_name,email_id:savedData.email_id,phone_number:savedData.phone_number,insurance_type:savedData.insurance_type, message: "Form submitted successfully"},{ status:200 });
  } catch (error) {
    console.error("Error saving contact form data:", error);
    return NextResponse.json({ message: "Error submitting form" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    await connectDB();
    const { id,full_name,email_id,phone_number,insurance_type,coverage_type,existing_health_insurance} = body;
    const updatedData = await Contact.findByIdAndUpdate(new Types.ObjectId(id),{full_name,email_id,phone_number,insurance_type,coverage_type, existing_health_insurance,}, { new: true });
    if (!updatedData) {
      return NextResponse.json({ message: "Data not found" }, { status: 404 });
    } else {    
      return NextResponse.json({data: updatedData._id, message: "Form submitted successfully" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error updating contact form data:", error);
    return NextResponse.json({ message: "Error updating form" }, { status: 500 });
  }
}