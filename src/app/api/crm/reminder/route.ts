import dbConfig from '../../dbConfig'; // Import MySQL config
import mysql from 'mysql2/promise';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, dueDate, amount } = body;

        if (!name || !email || !dueDate || !amount) {
            return new Response(JSON.stringify({ message: 'All fields are required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const connection = await mysql.createConnection(dbConfig);
        const now = new Date();
        const timestamp = now.toISOString();

        const query = `INSERT INTO reminders (name, email, dueDate, amount, created_at) 
                       VALUES (?, ?, ?, ?, ?)`;
        const values = [name, email, dueDate, amount, timestamp];

        await connection.execute(query, values);
        await connection.end();

        return new Response(JSON.stringify({ message: 'Reminder created successfully.' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating reminder:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to create reminder. Please try again later.' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
