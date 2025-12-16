// app/api/hr/employees/deleteemployee/route.js (or pages/api/hr/employees/deleteemployee.js)
import dbConfig from "../../../dbConfig" // Import your MySQL database configuration
import mysql from "mysql2/promise"
import { NextRequest,NextResponse } from "next/server"

const VALID_DELETE_PASSWORD = "@dm1n123" // Replace with your actual password

export async function DELETE(req:NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { message: "Employee ID is required" },
        { status: 400 }
      )
    }

    const { password } = await req.json()

    if (!password || password !== VALID_DELETE_PASSWORD) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      )
    }

    // If the password is valid, proceed with deletion
    const connection = await mysql.createConnection(dbConfig)
    await connection.execute("DELETE FROM employees WHERE id = ?", [id])
    await connection.end()

    return NextResponse.json({ message: "Employee deleted successfully" })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { message: "Failed to delete employee. Please try again later." },
      { status: 500 }
    )
  }
}
