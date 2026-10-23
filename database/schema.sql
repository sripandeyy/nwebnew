-- =============================================================================
-- Nyeras Platform MySQL Database Schema
-- Compatible with MySQL 8.0+ and Hostinger Business Shared Hosting
-- Charset: utf8mb4, Collation: utf8mb4_unicode_ci
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Leads Table (Offline forms, brochures, counseling, CRM, website contact)
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `course` VARCHAR(255) DEFAULT NULL,
  `timestamp` VARCHAR(100) DEFAULT NULL,
  `date` VARCHAR(100) DEFAULT NULL,
  `action` VARCHAR(100) DEFAULT 'New Lead',
  `myaction` VARCHAR(100) DEFAULT 'Not Reviewed',
  `message` TEXT DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `assignedto` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_leads_email` (`email`),
  INDEX `idx_leads_phone` (`phone`),
  INDEX `idx_leads_assignedto` (`assignedto`),
  INDEX `idx_leads_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Callback Requests (Course details popup callback requests)
CREATE TABLE IF NOT EXISTS `callback_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `course` VARCHAR(150) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_callback_phone` (`phone_number`),
  INDEX `idx_callback_email` (`email`),
  INDEX `idx_callback_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Dynamic Site Content (Key-value JSON store for courses, blogs, gallery, mous)
CREATE TABLE IF NOT EXISTS `site_content` (
  `content_key` VARCHAR(64) NOT NULL PRIMARY KEY,
  `data` LONGTEXT NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Site Media (Blob media storage for banners, uploads, thumbnails)
CREATE TABLE IF NOT EXISTS `site_media` (
  `id` CHAR(32) NOT NULL PRIMARY KEY,
  `mime` VARCHAR(64) NOT NULL,
  `data` LONGBLOB NOT NULL,
  `size` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Campus Ambassador Applications
CREATE TABLE IF NOT EXISTS `campus_ambassador_applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `college` VARCHAR(255) NOT NULL,
  `department` VARCHAR(150) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_ca_phone` (`phone_number`),
  INDEX `idx_ca_college` (`college`(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Business Development (BD) Applications
CREATE TABLE IF NOT EXISTS `bd_applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `experience_level` VARCHAR(50) NOT NULL,
  `years_of_experience` INT DEFAULT NULL,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_bda_email` (`email`),
  INDEX `idx_bda_phone` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. LinkedIn Integration State (OAuth tokens, sync locks, posts cache)
CREATE TABLE IF NOT EXISTS `linkedin_state` (
  `state_key` VARCHAR(32) NOT NULL PRIMARY KEY,
  `data` LONGTEXT NULL,
  `updated_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Job Postings / Recruiter Submissions
CREATE TABLE IF NOT EXISTS `jobPostings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `recruiterName` VARCHAR(150) NOT NULL,
  `recruiterEmail` VARCHAR(150) NOT NULL,
  `recruiterPhone` VARCHAR(50) NOT NULL,
  `companyName` VARCHAR(200) DEFAULT NULL,
  `companyWebsite` VARCHAR(255) DEFAULT NULL,
  `jobTitle` VARCHAR(200) NOT NULL,
  `jobDescription` TEXT NOT NULL,
  `jobType` VARCHAR(50) NOT NULL,
  `experienceLevel` VARCHAR(50) NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `salary` VARCHAR(100) DEFAULT NULL,
  `skills` TEXT NOT NULL,
  `additionalInfo` TEXT DEFAULT NULL,
  `timestamp` VARCHAR(100) DEFAULT NULL,
  `date` VARCHAR(100) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'Pending Review',
  INDEX `idx_jp_recruiter_email` (`recruiterEmail`),
  INDEX `idx_jp_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Certificates (Verification portal)
CREATE TABLE IF NOT EXISTS `certificates` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `course` VARCHAR(200) NOT NULL,
  `startDate` VARCHAR(50) DEFAULT NULL,
  `endDate` VARCHAR(50) DEFAULT NULL,
  `issueDate` VARCHAR(50) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'Verified',
  `certificate_upload` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_cert_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. CRM Login / User Management
CREATE TABLE IF NOT EXISTS `crm_login` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `crm_uid` VARCHAR(100) DEFAULT NULL,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'user',
  `status` VARCHAR(50) DEFAULT 'active',
  `last_login_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_crm_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. CRM Payment Reminders
CREATE TABLE IF NOT EXISTS `reminders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `dueDate` VARCHAR(50) NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'pending',
  `created_at` VARCHAR(100) DEFAULT NULL,
  INDEX `idx_reminders_email` (`email`),
  INDEX `idx_reminders_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. CRM Tasks
CREATE TABLE IF NOT EXISTS `tasks` (
  `taskId` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `assignee` VARCHAR(255) NOT NULL,
  `dueDate` VARCHAR(50) DEFAULT NULL,
  `type` VARCHAR(100) DEFAULT NULL,
  `status` ENUM('todo', 'inprogress', 'closed') DEFAULT 'todo',
  `timeSpent` INT DEFAULT 0,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_tasks_assignee` (`assignee`),
  INDEX `idx_tasks_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. CRM Task Descriptions / Activity Log
CREATE TABLE IF NOT EXISTS `task_descriptions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `taskId` INT NOT NULL,
  `description` TEXT NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_td_taskid` (`taskId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Employees (HR Directory)
CREATE TABLE IF NOT EXISTS `employees` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `phone` VARCHAR(50) DEFAULT NULL,
  `position` VARCHAR(100) DEFAULT NULL,
  `department` VARCHAR(100) DEFAULT NULL,
  `salary` DECIMAL(10, 2) DEFAULT 0.00,
  `date_joined` VARCHAR(50) DEFAULT NULL,
  `rfid` VARCHAR(100) DEFAULT NULL,
  `isdocs` ENUM('yes', 'no') DEFAULT 'no',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_emp_email` (`email`),
  INDEX `idx_emp_dept` (`department`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. Employee Portal KYC Documents
CREATE TABLE IF NOT EXISTS `employee_details` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(100) NOT NULL,
  `middleName` VARCHAR(100) DEFAULT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `aadharName` VARCHAR(150) NOT NULL,
  `aadharNumber` VARCHAR(50) NOT NULL,
  `panNumber` VARCHAR(50) NOT NULL,
  `profilePhotoUrl` TEXT DEFAULT NULL,
  `aadharFrontUrl` TEXT DEFAULT NULL,
  `aadharBackUrl` TEXT DEFAULT NULL,
  `panFrontUrl` TEXT DEFAULT NULL,
  `degree` VARCHAR(100) DEFAULT NULL,
  `studyMode` VARCHAR(50) DEFAULT NULL,
  `collegeName` VARCHAR(255) DEFAULT NULL,
  `degreeLevel` VARCHAR(50) DEFAULT NULL,
  `grade` VARCHAR(50) DEFAULT NULL,
  `educationDocumentsUrls` LONGTEXT DEFAULT NULL,
  `accountNumber` VARCHAR(50) DEFAULT NULL,
  `ifscCode` VARCHAR(50) DEFAULT NULL,
  `bankName` VARCHAR(150) DEFAULT NULL,
  `passbookOrChequeUrl` TEXT DEFAULT NULL,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_ed_aadhar` (`aadharNumber`),
  INDEX `idx_ed_pan` (`panNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. HR Attendance Log
CREATE TABLE IF NOT EXISTS `attendance_log` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `empid` INT NOT NULL,
  `check_in` DATETIME DEFAULT NULL,
  `check_out` DATETIME DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT NULL,
  `loggeddate` VARCHAR(50) NOT NULL,
  `totalworkhours` DECIMAL(5, 2) DEFAULT NULL,
  `attendancestatus` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_att_empid_date` (`empid`, `loggeddate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. BDA Sales Submissions
CREATE TABLE IF NOT EXISTS `bdasales` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `salesPersonName` VARCHAR(150) NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `date` VARCHAR(50) NOT NULL,
  `customerName` VARCHAR(150) NOT NULL,
  `customerPhone` VARCHAR(50) NOT NULL,
  `status` ENUM('pending', 'completed', 'rejected') DEFAULT 'pending',
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_bda_salesperson` (`salesPersonName`),
  INDEX `idx_bda_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. Razorpay Webhooks Archive
CREATE TABLE IF NOT EXISTS `razorpay_webhooks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `payload` LONGTEXT NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 19. Placement Job Board
CREATE TABLE IF NOT EXISTS `placement_jobs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `company` VARCHAR(255) NOT NULL,
  `logo` VARCHAR(255) DEFAULT '/logo.png',
  `domain` VARCHAR(150) NOT NULL,
  `type` VARCHAR(50) DEFAULT 'Full-time',
  `experience` VARCHAR(100) DEFAULT 'Fresher / 0-1 Years',
  `location` VARCHAR(150) DEFAULT 'Bangalore / Hybrid',
  `remote_option` VARCHAR(50) DEFAULT 'Hybrid',
  `salary` VARCHAR(100) DEFAULT 'Disclosed upon interview',
  `description` TEXT NOT NULL,
  `eligibility` TEXT DEFAULT NULL,
  `skills` TEXT NOT NULL,
  `deadline` VARCHAR(50) DEFAULT 'Rolling basis',
  `apply_url` VARCHAR(255) DEFAULT '#apply-portal',
  `is_verified` TINYINT(1) DEFAULT 1,
  `is_featured` TINYINT(1) DEFAULT 0,
  `status` VARCHAR(50) DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_pj_status` (`status`),
  INDEX `idx_pj_domain` (`domain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 20. Placement Job Applications
CREATE TABLE IF NOT EXISTS `placement_applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `job_id` INT NOT NULL,
  `user_email` VARCHAR(150) NOT NULL,
  `user_name` VARCHAR(150) NOT NULL,
  `resume_name` VARCHAR(255) DEFAULT NULL,
  `resume_url` TEXT DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'Applied',
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_pa_job_user` (`job_id`, `user_email`),
  INDEX `idx_pa_user_email` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 21. Placement In-App Notifications
CREATE TABLE IF NOT EXISTS `placement_notifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_email` VARCHAR(150) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `type` VARCHAR(50) DEFAULT 'system',
  `is_read` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_pn_user_read` (`user_email`, `is_read`),
  INDEX `idx_pn_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 22. Placement Student Profiles & Eligibility
CREATE TABLE IF NOT EXISTS `placement_student_profiles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_email` VARCHAR(150) NOT NULL UNIQUE,
  `user_name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `degree` VARCHAR(100) DEFAULT NULL,
  `grad_year` VARCHAR(10) DEFAULT NULL,
  `domain` VARCHAR(150) DEFAULT NULL,
  `enrolled_plan` VARCHAR(100) DEFAULT 'Pro (Job Guarantee)',
  `attendance_pct` INT DEFAULT 85,
  `assessments_cleared` INT DEFAULT 0,
  `projects_submitted` INT DEFAULT 0,
  `eligibility_status` VARCHAR(50) DEFAULT 'Eligible',
  `preferred_roles` TEXT DEFAULT NULL,
  `target_locations` TEXT DEFAULT NULL,
  `linkedin_url` VARCHAR(255) DEFAULT NULL,
  `github_url` VARCHAR(255) DEFAULT NULL,
  `portfolio_url` VARCHAR(255) DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_psp_email` (`user_email`),
  INDEX `idx_psp_status` (`eligibility_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 23. Placement Mock Interviews
CREATE TABLE IF NOT EXISTS `placement_interviews` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_email` VARCHAR(150) NOT NULL,
  `user_name` VARCHAR(150) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `mentor_name` VARCHAR(150) DEFAULT 'Senior Technical Mentor',
  `scheduled_time` VARCHAR(100) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Requested',
  `meeting_link` VARCHAR(255) DEFAULT NULL,
  `score` INT DEFAULT NULL,
  `strengths` TEXT DEFAULT NULL,
  `improvements` TEXT DEFAULT NULL,
  `action_items` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_pi_user_email` (`user_email`),
  INDEX `idx_pi_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 24. Placement Resumes
CREATE TABLE IF NOT EXISTS `placement_resumes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_email` VARCHAR(150) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `version` VARCHAR(50) DEFAULT 'v1.0',
  `file_name` VARCHAR(255) NOT NULL,
  `file_size` VARCHAR(50) DEFAULT NULL,
  `file_data` LONGTEXT DEFAULT NULL,
  `feedback` TEXT DEFAULT NULL,
  `score` INT DEFAULT NULL,
  `is_primary` TINYINT(1) DEFAULT 0,
  `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_pr_user_primary` (`user_email`, `is_primary`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 25. Placement Support Tickets
CREATE TABLE IF NOT EXISTS `placement_support_tickets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_email` VARCHAR(150) NOT NULL,
  `user_name` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Open',
  `admin_reply` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_pst_user_email` (`user_email`),
  INDEX `idx_pst_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 26. HR Leave Requests
CREATE TABLE IF NOT EXISTS `leave_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` VARCHAR(100) DEFAULT NULL,
  `employee_name` VARCHAR(150) DEFAULT NULL,
  `leave_type` VARCHAR(100) DEFAULT NULL,
  `from_date` DATE DEFAULT NULL,
  `to_date` DATE DEFAULT NULL,
  `reason` TEXT DEFAULT NULL,
  `status` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_lr_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 27. HR Recent Payroll
CREATE TABLE IF NOT EXISTS `recent_payroll` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` VARCHAR(100) DEFAULT NULL,
  `employee_name` VARCHAR(150) DEFAULT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `month` VARCHAR(50) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'paid',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 28. Public Support Tickets
CREATE TABLE IF NOT EXISTS `support_tickets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `timestamp` VARCHAR(100) DEFAULT NULL,
  `date` VARCHAR(100) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'Pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_st_email` (`email`),
  INDEX `idx_st_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
