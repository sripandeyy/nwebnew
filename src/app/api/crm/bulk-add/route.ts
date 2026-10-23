import { getDb } from '../../db';
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { leads, assignedTo } = body

    if (!Array.isArray(leads) || leads.length === 0) {
      return new Response(JSON.stringify({ message: "No valid leads data provided." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const limitedLeads = leads.slice(0, 100)

    const connection = getDb();
    const now = new Date()
    const istDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
    const date = istDate.toLocaleDateString() + ", " + istDate.toLocaleTimeString()
    const timestamp = istDate.toISOString()
    

    const query = `INSERT INTO leads (name, email, phone, course, action, date, myaction, timestamp, notes, assignedto) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const results = []

    for (const lead of limitedLeads) {
      const name = lead.name || "NA"
      const email = lead.email || "NA"
      const phone = lead.phone || "NA"
      const course = lead.course || "NA"

      const values = [
        name,
        email,
        phone,
        course,
        "Imported By Bulk Upload",
        date,
        "Not Reviewed",
        timestamp,
        "",
        assignedTo || lead.assignedTo || null,
      ]

      try {
        const [result] = await connection.execute(query, values)
        results.push(result)
      } catch (error) {
        console.error("Error inserting lead:", error)
      }
    }

    // connection returned to pool

    return new Response(JSON.stringify({
      message: `${results.length} leads added successfully.`,
      count: results.length,
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error:", error)
    return new Response(JSON.stringify({ message: "Failed to add leads. Please try again later." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
