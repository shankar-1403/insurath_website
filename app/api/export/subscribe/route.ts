import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Subscribe from "@/src/models/Subscribe"
import { format } from "@fast-csv/format"

export async function GET() {
  await connectDB()

  const encoder = new TextEncoder()

  const csvStream = format({
    headers: [
      "Email",
      "Created At",
    ],
  })

  const readable = new ReadableStream({
    async start(controller) {
      csvStream.on("data", (chunk) => {
        controller.enqueue(encoder.encode(chunk))
      })

      csvStream.on("end", () => controller.close())

      const cursor = Subscribe.find()
        .select(
          "email_id createdAt -_id"
        )
        .cursor()

      for await (const doc of cursor) {
        csvStream.write({
          "Email": doc.email_id,
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
