import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import BusinessInsurance from "@/src/models/BusinessInsurance"
import { format } from "@fast-csv/format"

export async function GET() {
  await connectDB()

  const encoder = new TextEncoder()

  const csvStream = format({
    headers: [ "Company Name","Contact Name", "Email", "Phone Number", "Business Type", "Industry","Annual Revenue","Number of employees","Business Insurance","Coverage Type","Estimated Property Value","Coverage Needs","Cyber Security Coverage","Priority Coverage Area", "Created At",
    ],
  })

  const readable = new ReadableStream({
    async start(controller) {
      csvStream.on("data", (chunk) => {
        controller.enqueue(encoder.encode(chunk))
      })

      csvStream.on("end", () => controller.close())

      const cursor = BusinessInsurance.find()
        .select(
          "company_name contact_person email_id phone_number business_type industry annual_revenue number_of_employees existing_business_insurance primary_coverage_type estimated_property_value liability_coverage_needs cyber_security_coverage priority_coverage_area -_id"
        )
        .cursor()

      for await (const doc of cursor) {
        csvStream.write({
          "Company Name": doc.company_name,
          "Contact Name": doc.contact_person,
          "Email": doc.email_id,
          "Phone Number": doc.phone_number,
          "Business Type": doc.business_type,
          "Industry": doc.industry,
          "Annual Revenue": doc.annual_revenue,
          "Number of employees": doc.number_of_employees,
          "Business Insurance": doc.existing_business_insurance,
          "Coverage Type": doc.primary_coverage_type,
          "Estimated Property Value": doc.estimated_property_value,
          "Coverage Needs": doc.liability_coverage_needs,
          "Cyber Security Coverage": doc.cyber_security_coverage,
          "Priority Coverage Area": doc.priority_coverage_area,
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
