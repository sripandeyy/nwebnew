
import { getDb } from '../db'; // Import your MySQL database configuration
import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, course } = body;

        if (!name || !email || !phone || !course) {
            return new Response(JSON.stringify({ message: 'All fields are required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const connection = getDb();
        const now = new Date();
        const date = now.toLocaleDateString() + ', ' + now.toLocaleTimeString();
        const timestamp = now.toISOString();

        const query = `INSERT INTO leads (name, email, phone, course, action, date, myaction, timestamp, notes) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            name,
            email,
            phone,
            course,
            'Filled Nyeras Form',
            date,
            'Not Reviewed',
            timestamp,
            '',
        ];

        await connection.execute(query, values);
        // connection returned to pool

        return new Response(JSON.stringify({ message: 'Lead added successfully.' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to add lead. Please try again later.' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
