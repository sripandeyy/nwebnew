import { NextRequest, NextResponse } from "next/server";
import { getDb } from '../../../db';

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { taskId, status } = body;

    // Validate required fields
    if (!taskId || !status) {
      return NextResponse.json({ message: "Invalid or missing fields." }, { status: 400 });
    }

    // Validate status value
    if (!["todo", "inprogress", "closed"].includes(status)) {
      return NextResponse.json({ message: "Invalid status value." }, { status: 400 });
    }

    const connection = getDb();

    const query = `
      UPDATE tasks 
      SET status = ? 
      WHERE taskId = ?
    `;
    const values = [status, taskId];

    await connection.execute(query, values);
    // connection returned to pool

    return NextResponse.json({ message: "Task status updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating task status:", error);
    return NextResponse.json(
      { message: "Failed to update task status. Please try again later." },
      { status: 500 }
    );
  }
}
