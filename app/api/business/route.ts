import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BusinessInsurance from "@/src/models/BusinessInsurance";
import { Types } from "mongoose";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const savedData = await BusinessInsurance.create(body);
    return NextResponse.json({id: savedData._id,company_name:savedData.company_name,contact_person:savedData.contact_person,email_id:savedData.email_id,phone_number:savedData.phone_number,business_type:savedData.business_type,industry:savedData.industry,annual_revenue:savedData.annual_revenue,number_of_employees:savedData.number_of_employees, message: "Form submitted successfully"},{ status:200 });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json({ message: "Error submitting form" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const { id,company_name,contact_person,email_id,phone_number,business_type,industry,annual_revenue,number_of_employees,existing_business_insurance,primary_coverage_type,estimated_property_value,liability_coverage_needs,cyber_security_coverage,priority_coverage_area} = body;
    const updatedData = await BusinessInsurance.findByIdAndUpdate(new Types.ObjectId(id),{company_name,contact_person,email_id,phone_number,business_type,industry,annual_revenue,number_of_employees,existing_business_insurance,primary_coverage_type,estimated_property_value,liability_coverage_needs,cyber_security_coverage,priority_coverage_area}, { new: true });
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