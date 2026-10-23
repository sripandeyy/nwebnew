import { getDb } from '../../db'; // Import your MySQL database configuration
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const connection = getDb();
    const [rows] = await connection.execute("SELECT * FROM employees")
    // connection returned to pool

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ message: "Failed to fetch data. Please try again later." }, { status: 500 })
  }
}
