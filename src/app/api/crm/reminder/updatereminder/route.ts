import { getDb } from '../../../db'; // Import MySQL config
import type mysql from "mysql2/promise";
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, status } = body;

        if (!id || status === undefined) {
            return new Response(JSON.stringify({ message: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const connection = getDb();
        const query = 'UPDATE reminders SET status = ? WHERE id = ?';
        const values = [status, id];

        const [result] = await connection.execute<mysql.ResultSetHeader>(query, values);
        // connection returned to pool

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ message: 'Reminder not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'Reminder status updated successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error updating reminder status:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(
            JSON.stringify({ message: 'Database error', error: errorMessage }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}