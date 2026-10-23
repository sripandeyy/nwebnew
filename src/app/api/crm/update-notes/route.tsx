import { getDb } from '../../db';
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, notes } = body

    if (!id) {
      return new Response(JSON.stringify({ message: "Lead ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const connection = getDb();
    await connection.execute("UPDATE leads SET notes = ? WHERE id = ?", [notes, id])
    // connection returned to pool

    return new Response(JSON.stringify({ message: "Notes updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error:", error)
    return new Response(JSON.stringify({ message: "Failed to update notes. Please try again later." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

