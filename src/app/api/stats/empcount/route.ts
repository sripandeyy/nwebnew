import dbConfig from '../../dbConfig'; // Your MySQL database configuration
import mysql, { type RowDataPacket } from 'mysql2/promise';

export async function GET() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // 1. Total employees
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT COUNT(*) AS totalEmployees FROM employees`
    );
    const totalEmployees = rows[0]?.totalEmployees;

    // 2. Documents (count of records where isdocs = 'no')
    const [docsRows] = await connection.execute<RowDataPacket[]>(
      `SELECT COUNT(*) AS docsCount FROM employees WHERE isdocs = 'no'`
    );
    const docsCount = docsRows[0]?.docsCount;

    // 3. Leave Requests pending
    const [pendingLeavesRows] = await connection.execute<RowDataPacket[]>(
      `SELECT COUNT(*) AS pendingLeaves FROM leave_requests WHERE status = 'pending'`
    );
    const pendingLeaves = pendingLeavesRows[0]?.pendingLeaves;

    // 4. Recent Leave Requests (limit 5)
    //    Adjust ordering criteria as per your schema, for example "ORDER BY created_at DESC"
    const [recentLeaveRequests] = await connection.execute(
      `SELECT * FROM leave_requests ORDER BY id DESC LIMIT 5`
    );

    // 5. Recent Payroll (limit 5)
    //    Adjust ordering as per your actual schema, for example "ORDER BY created_at DESC"
    const [recentPayroll] = await connection.execute(
      `SELECT * FROM recent_payroll ORDER BY id DESC LIMIT 5`
    );

    console.log('Total Employees:', totalEmployees);
    console.log('Documents Count:', docsCount);
    console.log('Pending Leaves:', pendingLeaves);
    console.log('Recent Leave Requests:', recentLeaveRequests);
    console.log('Recent Payroll:', recentPayroll);


    await connection.end();

    // Return all data in a single JSON response
    return new Response(
      JSON.stringify({
        totalEmployees,
        docsCount,
        pendingLeaves,
        recentLeaveRequests,
        recentPayroll,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to fetch data. Please try again later.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
