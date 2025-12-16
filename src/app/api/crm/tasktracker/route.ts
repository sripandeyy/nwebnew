import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dbConfig from "../../dbConfig"; // Import MySQL database configuration

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    if (req.method !== "GET") {
      return new NextResponse(JSON.stringify({ message: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }
    const connection = await mysql.createConnection(dbConfig);

    // Fetch all tasks
    const [rows] = await connection.execute("SELECT * FROM tasks ORDER BY createdAt DESC");
    await connection.end();

    return new NextResponse(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
