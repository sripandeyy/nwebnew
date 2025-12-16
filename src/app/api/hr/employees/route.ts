import dbConfig from "../../dbConfig" // Import your MySQL database configuration
import mysql from "mysql2/promise"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const connection = await mysql.createConnection(dbConfig)
    const [rows] = await connection.execute("SELECT * FROM employees")
    await connection.end()

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ message: "Failed to fetch data. Please try again later." }, { status: 500 })
  }
}
