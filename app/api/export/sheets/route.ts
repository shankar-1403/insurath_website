import { connectDB } from "@/lib/mongodb"
import HomeContact from "@/src/models/Home"

export async function GET() {
  await connectDB()

  const data = await HomeContact.find()
    .select(
      "full_name email_id phone_number insurance_type type createdAt -_id"
    )
    .lean()

  const rows: string[][] = [
    ["Name", "Email", "Phone Number", "Insurance Type", "Type", "Created At"],
  ]

  for (const d of data) {
    rows.push([
      d.full_name ?? "",
      d.email_id ?? "",
      d.phone_number ?? "",
      d.insurance_type ?? "",
      d.type ?? "",
      d.createdAt ? new Date(d.createdAt).toISOString() : "",
    ])
  }

  const csv = rows.map((r) => r.join(",")).join("\n") + "\n"

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}
