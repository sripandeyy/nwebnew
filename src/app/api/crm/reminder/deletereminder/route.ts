import { getDb } from '../../../db'; // Import MySQL config
import type { ResultSetHeader   } from "mysql2/promise";
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (!id) {
            return new Response(JSON.stringify({ message: 'Reminder ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const connection = getDb();
        const [result] = await connection.execute<ResultSetHeader>('DELETE FROM reminders WHERE id = ?', [id]);
        // connection returned to pool

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ message: 'Reminder not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'Reminder deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error deleting reminder:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to delete reminder. Please try again later.' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
