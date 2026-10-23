import type { NextRequest } from "next/server"
import type {  RowDataPacket  } from "mysql2/promise";
import { getDb } from '../../db';


/**
 * Adds 5 hours 30 minutes to whatever local time is parsed from the string.
 * This only works correctly if `dateString` is truly in UTC or if you
 * specifically need to shift the stored time by +5:30 from its original base.
 */
function addFiveHoursThirtyMinutes(dateString: string | null): string | null {
  if (!dateString) return null

  // IMPORTANT: We use 'new Date(dateString)' without "Z"
  // so JavaScript does NOT interpret it as an explicit UTC timestamp.
  const dateObj = new Date(dateString)

  // Add 5 hours and 30 minutes
  dateObj.setHours(dateObj.getHours() + 5)
  dateObj.setMinutes(dateObj.getMinutes() + 30)

  // Format the date as "YYYY-MM-DD HH:mm:ss"
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, "0")
  const day = String(dateObj.getDate()).padStart(2, "0")
  const hours = String(dateObj.getHours()).padStart(2, "0")
  const minutes = String(dateObj.getMinutes()).padStart(2, "0")
  const seconds = String(dateObj.getSeconds()).padStart(2, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log("Incoming request body:", body)

    const { date } = body

    if (!date) {
      return new Response(JSON.stringify({ message: "Date is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const connection = getDb();

    const query = `
      SELECT 
        e.id,
        e.name,
        e.department,
        a.id AS attendance_id,
        a.check_in,
        a.check_out,
        a.status,
        a.loggeddate,
        a.totalworkhours,
        a.attendancestatus
      FROM 
        employees e
      LEFT JOIN 
        attendance_log a ON e.id = a.empid AND a.loggeddate = ?
      ORDER BY 
        e.name ASC
    `

    const [rows] = await connection.execute<RowDataPacket[]>(query, [date])
    console.log("Database rows:", rows)

    // connection returned to pool

    const employeesMap = new Map()

    rows.forEach((row) => {
      if (!employeesMap.has(row.id)) {
        employeesMap.set(row.id, {
          id: row.id,
          name: row.name,
          department: row.department || "Not Assigned",
          attendance: [],
        })
      }

      // If an attendance record for the specified date exists
      if (row.attendance_id) {
        employeesMap.get(row.id).attendance.push({
          id: row.attendance_id,
          // Just add 5:30 to the parsed time instead of re-interpreting it as UTC
          check_in: addFiveHoursThirtyMinutes(row.check_in),
          check_out: addFiveHoursThirtyMinutes(row.check_out),
          status: row.status,
          loggeddate: row.loggeddate,
          totalworkhours: row.totalworkhours,
          attendancestatus: row.attendancestatus,
        })
      } else {
        // If there's no record for this date, push a default "Absent" record
        employeesMap.get(row.id).attendance.push({
          id: null,
          check_in: null,
          check_out: null,
          status: null,
          loggeddate: date,
          totalworkhours: 0,
          attendancestatus: "Absent",
        })
      }
    })

    const employees = Array.from(employeesMap.values())
    console.log("Processed employees array:", employees)

    return new Response(JSON.stringify({ employees }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching attendance data:", error)
    return new Response(JSON.stringify({
      message: "Failed to fetch attendance data. Please try again later."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
