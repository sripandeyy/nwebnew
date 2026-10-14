import dbConfig from "../../../dbConfig"; // Import MySQL database configuration
import mysql from "mysql2/promise";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { title, assignee, dueDate, type } = body;

    // Validate required fields
    if (!title || !assignee || !dueDate || !type) {
      return new Response(JSON.stringify({ message: "Invalid or missing fields." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const connection = await mysql.createConnection(dbConfig);

    const query = `
      INSERT INTO tasks (title, assignee, dueDate, type)
      VALUES (?, ?, ?, ?)
    `;
    const values = [title, assignee, dueDate, type];

    await connection.execute(query, values);
    await connection.end();

    return new Response(
      JSON.stringify({
        message: "Task created successfully.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return new Response(JSON.stringify({ message: "Failed to create task. Please try again later." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
