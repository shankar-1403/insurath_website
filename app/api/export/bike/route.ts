import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import BikeInsurance from "@/src/models/BikeInsurance"
import { format } from "@fast-csv/format"

export async function GET() {
  await connectDB()

  const encoder = new TextEncoder()

  const csvStream = format({
    headers: [ "Full Name", "Email", "Phone Number", "City", "Bike Name","Bike Model","Manufacturing Year","Registration Year","Registration Number","Existing Bike Insurnce","Claim History","Desired Coverage Type", "Created At",
    ],
  })

  const readable = new ReadableStream({
    async start(controller) {
      csvStream.on("data", (chunk) => {
        controller.enqueue(encoder.encode(chunk))
      })

      csvStream.on("end", () => controller.close())

      const cursor = BikeInsurance.find()
        .select(
          "full_name email_id phone_number city bike_name bike_model manufacturing_year registration_year registration_number exisiting_bike_insurance claim_history desired_coverage_type createdAt -_id"
        )
        .cursor()

      for await (const doc of cursor) {
        csvStream.write({
          "Name": doc.full_name,
          "Email": doc.email_id,
          "Phone Number": doc.phone_number,
          "City": doc.city,
          "Bike Name": doc.bike_name,
          "Bike Model": doc.bike_model,
          "Manufacturing Year": doc.manufacturing_year,
          "Registration Year": doc.registration_year,
          "Registration Number": doc.registration_number,
          "Existing Bike Insurnce": doc.exisiting_bike_insurance,
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
