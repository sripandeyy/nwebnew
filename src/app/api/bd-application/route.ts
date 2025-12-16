import { NextRequest } from "next/server"
import mysql from "mysql2/promise"
import dbConfig from "../dbConfig"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone_number, experience_level, years_of_experience } = body

    // Validation
    if (
      !name || typeof name !== "string" || name.trim() === "" ||
      !email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !phone_number || typeof phone_number !== "string" || !/^\d{10}$/.test(phone_number) ||
      !experience_level || !["Fresher", "Experienced"].includes(experience_level)
    ) {
      return new Response(
        JSON.stringify({ 
          success: false,
          message: "Invalid data. Ensure all fields are filled correctly." 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Validate years_of_experience if experience_level is "Experienced"
    if (experience_level === "Experienced") {
      if (
        years_of_experience === null || 
        years_of_experience === undefined ||
        typeof years_of_experience !== "number" ||
        years_of_experience < 0 ||
        years_of_experience > 50
      ) {
        return new Response(
          JSON.stringify({ 
            success: false,
            message: "Please provide valid years of experience (0-50)." 
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        )
      }
    }

    // Create database connection
    const connection = await mysql.createConnection(dbConfig)

    try {
      // Insert data into bd_applications table
      const query = `
        INSERT INTO bd_applications 
        (name, email, phone_number, experience_level, years_of_experience, submitted_at) 
        VALUES (?, ?, ?, ?, ?, NOW())
      `
      const values = [
        name,
        email,
        phone_number,
        experience_level,
        experience_level === "Experienced" ? years_of_experience : null,
      ]

      await connection.execute(query, values)

      return new Response(
        JSON.stringify({ 
          success: true,
          message: "Business Development application submitted successfully!" 
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
    console.error("Error submitting BD application:", error)
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
