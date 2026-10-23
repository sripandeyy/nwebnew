import { getDb } from '../../../db'; // Import MySQL config
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        if(req.method !== 'GET') {
            return new Response(JSON.stringify({ message: 'Method not allowed' }), {
                status: 405,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const connection = getDb();
        const [rows] = await connection.execute('SELECT * FROM reminders');
        // connection returned to pool

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching reminders:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to fetch reminders. Please try again later.' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
