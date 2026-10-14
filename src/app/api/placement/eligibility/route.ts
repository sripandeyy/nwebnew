import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../db';
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { errorMessage } from '../../_lib/errors';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('email');
    const isAdmin = searchParams.get('admin') === 'true';

    const pool = getDb();

    if (isAdmin && !userEmail) {
      const [allProfiles] = await pool.query('SELECT * FROM placement_student_profiles ORDER BY updated_at DESC LIMIT 50');
      return NextResponse.json({ success: true, profiles: allProfiles });
    }

    if (!userEmail) {
      return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
    }

    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM placement_student_profiles WHERE user_email = ?', [userEmail]);

    if (rows.length === 0) {
      // Create initial profile for the student
      const [insertResult] = await pool.execute<ResultSetHeader>(
        `INSERT INTO placement_student_profiles 
        (user_email, user_name, domain, enrolled_plan, attendance_pct, assessments_cleared, projects_submitted, eligibility_status, preferred_roles, target_locations)
        VALUES (?, ?, 'Full Stack Web Development', 'Pro (Job Guarantee)', 88, 7, 3, 'Eligible', 'Frontend Engineer, Full Stack Developer, React Engineer', 'Bangalore, Hyderabad, Remote')`,
        [userEmail, userEmail.split('@')[0]]
      );
      const [newRow] = await pool.execute<RowDataPacket[]>('SELECT * FROM placement_student_profiles WHERE id = ?', [insertResult.insertId]);
      return NextResponse.json({ success: true, profile: newRow[0] });
    }

    return NextResponse.json({ success: true, profile: rows[0] });
  } catch (err) {
    console.error('Error fetching eligibility profile:', err);
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userEmail,
      userName,
      phone,
      degree,
      gradYear,
      domain,
      enrolledPlan,
      attendancePct,
      assessmentsCleared,
      projectsSubmitted,
      eligibilityStatus,
      preferredRoles,
      targetLocations,
      linkedinUrl,
      githubUrl,
      portfolioUrl
    } = body;

    if (!userEmail) {
      return NextResponse.json({ success: false, error: 'User email required' }, { status: 400 });
    }

    const pool = getDb();
    await pool.execute(
      `INSERT INTO placement_student_profiles (
        user_email, user_name, phone, degree, grad_year, domain, enrolled_plan,
        attendance_pct, assessments_cleared, projects_submitted, eligibility_status,
        preferred_roles, target_locations, linkedin_url, github_url, portfolio_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        user_name = COALESCE(?, user_name),
        phone = COALESCE(?, phone),
        degree = COALESCE(?, degree),
        grad_year = COALESCE(?, grad_year),
        domain = COALESCE(?, domain),
        enrolled_plan = COALESCE(?, enrolled_plan),
        attendance_pct = COALESCE(?, attendance_pct),
        assessments_cleared = COALESCE(?, assessments_cleared),
        projects_submitted = COALESCE(?, projects_submitted),
        eligibility_status = COALESCE(?, eligibility_status),
        preferred_roles = COALESCE(?, preferred_roles),
        target_locations = COALESCE(?, target_locations),
        linkedin_url = COALESCE(?, linkedin_url),
        github_url = COALESCE(?, github_url),
        portfolio_url = COALESCE(?, portfolio_url)`,
      [
        userEmail, userName || userEmail.split('@')[0], phone || '', degree || 'B.Tech / BCA / MCA',
        gradYear || '2025', domain || 'Full Stack Web Development', enrolledPlan || 'Pro (Job Guarantee)',
        attendancePct ?? 88, assessmentsCleared ?? 7, projectsSubmitted ?? 3,
        eligibilityStatus || 'Eligible', preferredRoles || '', targetLocations || '',
        linkedinUrl || '', githubUrl || '', portfolioUrl || '',
        userName || null, phone || null, degree || null, gradYear || null, domain || null, enrolledPlan || null,
        attendancePct ?? null, assessmentsCleared ?? null, projectsSubmitted ?? null,
        eligibilityStatus || null, preferredRoles || null, targetLocations || null,
        linkedinUrl || null, githubUrl || null, portfolioUrl || null
      ]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error updating eligibility profile:', err);
    return NextResponse.json({ success: false, error: errorMessage(err) }, { status: 500 });
  }
}
