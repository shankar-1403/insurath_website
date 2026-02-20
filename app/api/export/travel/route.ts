import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import TravelInsurance from "@/src/models/TravelInsurance"
import { format } from "@fast-csv/format"

export async function GET() {
  await connectDB()

  const encoder = new TextEncoder()

  const csvStream = format({
    headers: [ "Name","Email","Phone Number","Age","Gender","City","Created At"],
  })

  const readable = new ReadableStream({
    async start(controller) {
      csvStream.on("data", (chunk) => {
        controller.enqueue(encoder.encode(chunk))
      })

      csvStream.on("end", () => controller.close())

      const cursor = TravelInsurance.find()
        .select(
          "full_name email_id phone_number age city -_id"
        )
        .cursor()

      for await (const doc of cursor) {
        csvStream.write({
          "Name": doc.full_name,
          "Email": doc.email_id,
          "Phone Number": doc.phone_number,
          "Age": doc.age,
          "City": doc.city,
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
