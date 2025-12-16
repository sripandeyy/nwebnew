import { NextRequest } from "next/server"
import mysql from "mysql2/promise"
import dbConfig from "../dbConfig"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, college, department, phone_number } = body

    // Validation
    if (
      !name || typeof name !== "string" || name.trim() === "" ||
      !college || typeof college !== "string" || college.trim() === "" ||
      !department || typeof department !== "string" || department.trim() === "" ||
      !phone_number || typeof phone_number !== "string" || !/^\d{10}$/.test(phone_number)
    ) {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: "Invalid data. Ensure all fields are filled correctly and phone number is 10 digits." 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Create database connection
    const connection = await mysql.createConnection(dbConfig)

    try {
      // Insert data into campus_ambassador_applications table
      const query = `
        INSERT INTO campus_ambassador_applications 
        (name, college, department, phone_number, submitted_at) 
        VALUES (?, ?, ?, ?, NOW())
      `
      const values = [name, college, department, phone_number]

      await connection.execute(query, values)

      return new Response(
        JSON.stringify({ 
          success: true,
          message: "Campus Ambassador application submitted successfully!" 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error("Error submitting campus ambassador application:", error)
    return new Response(
      JSON.stringify({ 
        success: false,
        message: "Failed to submit application. Please try again later." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
