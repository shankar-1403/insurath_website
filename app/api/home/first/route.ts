import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HomeContact from "@/src/models/Home";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    await HomeContact.create(body);
    return NextResponse.json({message: "Form submitted successfully"},{ status:200 });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json({ message: "Error submitting form" }, { status: 500 });
  }
}