import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import HealthInsurance from "@/src/models/HealthInsurance"
import { format } from "@fast-csv/format"

export async function GET() {
  await connectDB()

  const encoder = new TextEncoder()

  const csvStream = format({
    headers: [ "Name","Email","Phone Number","Age","Gender","City","Coverage Type","Existing Health Insurnce","Pre Existing Conditions","Desired Coverage Amount","Created At",],
  })

  const readable = new ReadableStream({
    async start(controller) {
      csvStream.on("data", (chunk) => {
        controller.enqueue(encoder.encode(chunk))
      })

      csvStream.on("end", () => controller.close())

      const cursor = HealthInsurance.find()
        .select(
          "full_name email_id phone_number age gender city coverage_type existing_health_insurance pre_existing_conditions desired_coverage_amount -_id"
        )
        .cursor()

      for await (const doc of cursor) {
        csvStream.write({
          "Name": doc.full_name,
          "Email": doc.email_id,
          "Phone Number": doc.phone_number,
          "Age": doc.age,
          "Gender": doc.gender,
          "City": doc.city,
          "Coverage Type": doc.coverage_type,
          "Existing Health Insurnce": doc.existing_health_insurance,
          "Pre Existing Conditions": doc.pre_existing_conditions,
          "Desired Coverage Amount": doc.desired_coverage_amount,
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
