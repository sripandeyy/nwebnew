import { type NextRequest, NextResponse } from "next/server";
import { getDb } from '../../../db';

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { taskId, minutes, description } = body;

    // Validate required fields
    if (!taskId || !minutes) {
      return NextResponse.json({ message: "Invalid or missing fields." }, { status: 400 });
    }

    const connection = getDb();

    // Update the task's total time spent
    const updateQuery = `
      UPDATE tasks 
      SET timeSpent = timeSpent + ? 
      WHERE taskId = ?
    `;
    const updateValues = [minutes, taskId];
    await connection.execute(updateQuery, updateValues);

    // If a description is provided, insert it into task_descriptions
    if (description) {
      const descQuery = `
        INSERT INTO task_descriptions (taskId, description, createdAt)
        VALUES (?, ?, NOW())
      `;
      const descValues = [taskId, description];
      await connection.execute(descQuery, descValues);
    }

    // connection returned to pool

    return NextResponse.json({ message: "Time logged successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error logging time:", error);
    return NextResponse.json({ message: "Failed to log time. Please try again later." }, { status: 500 });
  }
}
