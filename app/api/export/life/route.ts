import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import LifeInsurance from "@/src/models/LifeInsurance"
import { format } from "@fast-csv/format"

export async function GET() {
  await connectDB()

  const encoder = new TextEncoder()

  const csvStream = format({
    headers: [ "Name","Email","Phone Number","Age","Gender","City","Family Size","Income Range","Exisiting Life Insurance","Health Condition","Desired Coverage Amount","Created At"],
  })

  const readable = new ReadableStream({
    async start(controller) {
      csvStream.on("data", (chunk) => {
        controller.enqueue(encoder.encode(chunk))
      })

      csvStream.on("end", () => controller.close())

      const cursor = LifeInsurance.find()
        .select(
          "full_name email_id phone_number age gender city family_size income_range exisitng_life_insurance health_condition desired_coverage_amount -_id"
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
          "Family Size": doc.family_size,
          "Income Range": doc.income_range,
          "Exisiting Life Insurance": doc.exisitng_life_insurance,
          "Health Condition": doc.health_condition,
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
