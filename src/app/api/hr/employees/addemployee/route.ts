


import dbConfig from "../../../dbConfig" // Import your MySQL database configuration
import mysql from "mysql2/promise"
import { type NextRequest, NextResponse } from "next/server"
export async function POST(req: NextRequest) {
    try {
      const body = await req.json()
      const { name, email, phone, position, department, salary, date_joined, rfid, isdocs } = body
  
      const connection = await mysql.createConnection(dbConfig)
  
      const [result] = await connection.execute(
        "INSERT INTO employees (name, email, phone, position, department, salary, date_joined, rfid, isdocs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [name, email, phone, position, department, salary, date_joined, rfid, isdocs],
      )
  
      await connection.end()
  
      return NextResponse.json({ message: "Employee added successfully" }, { status: 201 })
    } catch (error) {
      console.error("Error:", error)
      return NextResponse.json({ message: "Failed to add employee. Please try again later." }, { status: 500 })
    }
  }