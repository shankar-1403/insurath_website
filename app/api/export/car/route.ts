import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import CarInsurance from "@/src/models/CarInsurance"
import { format } from "@fast-csv/format"

export async function GET() {
  await connectDB()

  const encoder = new TextEncoder()

  const csvStream = format({
    headers: [ "Name", "Email", "Phone Number", "City", "Car Name", "Car Model", "Manufacturing Year", "Registration Year", "Registration Number", "Existing Car Insurnce", "Claim History", "Desired Coverage Type", "Created At",
    ],
  })

  const readable = new ReadableStream({
    async start(controller) {
      csvStream.on("data", (chunk) => {
        controller.enqueue(encoder.encode(chunk))
      })

      csvStream.on("end", () => controller.close())

      const cursor = CarInsurance.find()
        .select(
          "full_name email_id phone_number city vehicle_name vehicle_model manufacturing_year registration_year registration_number exisiting_car_insurance claim_history desired_coverage_type -_id"
        )
        .cursor()

      for await (const doc of cursor) {
        csvStream.write({
          "Name": doc.full_name,
          "Email": doc.email_id,
          "Phone Number": doc.phone_number,
          "City": doc.city,
          "Car Name": doc.vehicle_name,
          "Car Model": doc.vehicle_model,
          "Manufacturing Year": doc.manufacturing_year,
          "Registration Year": doc.registration_year,
          "Registration Number": doc.registration_number,
          "Existing Car Insurnce": doc.exisiting_car_insurance,
          "Claim History": doc.claim_history,
          "Desired Coverage Type": doc.desired_coverage_type,
          "Created At": doc.createdAt?.toISOString(),
        })
      }

      csvStream.end()
    },
  })

  return new NextResponse(readable, {
    headers: {
      "Content-Type": "text/csv",
      "Cache-Control": "no-store",
      "Content-Disposition": 'attachment; filename="export.csv"',
    },
  })
}
