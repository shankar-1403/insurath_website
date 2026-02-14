import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Subscribe from "@/src/models/Subscribe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    await Subscribe.create(body);
    return NextResponse.json({message: "Subscribed successfully"},{ status:200 });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json({ message: "Error submitting form" }, { status: 500 });
  }
}