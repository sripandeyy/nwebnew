import dbConfig from '../../../dbConfig'; // Import MySQL config
import mysql from 'mysql2/promise';
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

        const connection = await mysql.createConnection(dbConfig);
        const [result]: any = await connection.execute('DELETE FROM reminders WHERE id = ?', [id]);
        await connection.end();

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
