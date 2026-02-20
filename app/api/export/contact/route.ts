import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import HomeContact from "@/src/models/Home"
import { format } from "@fast-csv/format"

export async function GET() {
  await connectDB()

  const encoder = new TextEncoder()

  const csvStream = format({
    headers: [
      "Name",
      "Email",
      "Phone Number",
      "Insurance Type",
      "Subject",
      "Message",
      "Created At",
    ],
  })

  const readable = new ReadableStream({
    async start(controller) {
      csvStream.on("data", (chunk) => {
        controller.enqueue(encoder.encode(chunk))
      })

      csvStream.on("end", () => controller.close())

      const cursor = HomeContact.find()
        .select(
          "full_name email_id phone_number insurance_type subject message createdAt -_id"
        )
        .cursor()

      for await (const doc of cursor) {
        csvStream.write({
          "Name": doc.full_name,
          "Email": doc.email_id,
          "Phone Number": doc.phone_number,
          "Insurance Type": doc.insurance_type,
          "Subject": doc.subject,
          "Message": doc.message,
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
