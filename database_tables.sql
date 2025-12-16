-- ============================================
-- DATABASE TABLES FOR "WANT TO WORK WITH US" FEATURE
-- ============================================
-- This file contains SQL scripts to create tables for:
-- 1. Campus Ambassador Applications
-- 2. Business Development Applications
-- ============================================

-- Drop tables if they exist (CAUTION: This will delete all existing data)
-- Uncomment the lines below only if you want to recreate the tables
-- DROP TABLE IF EXISTS campus_ambassador_applications;
-- DROP TABLE IF EXISTS bd_applications;

-- ============================================
-- TABLE 1: Campus Ambassador Applications
-- ============================================
-- Stores applications from students who want to become campus ambassadors

CREATE TABLE campus_ambassador_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    college VARCHAR(150) NOT NULL,
    department VARCHAR(120) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for better query performance
    INDEX idx_college (college),
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_phone (phone_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 2: Business Development Applications
-- ============================================
-- Stores applications from candidates applying for Business Development positions

CREATE TABLE bd_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    experience_level ENUM('Fresher', 'Experienced') NOT NULL,
    years_of_experience DECIMAL(3,1) DEFAULT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for better query performance
    INDEX idx_experience_level (experience_level),
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_email (email),
    INDEX idx_phone (phone_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these queries to verify the tables were created successfully

-- Check Campus Ambassador Applications table structure
DESCRIBE campus_ambassador_applications;

-- Check Business Development Applications table structure
DESCRIBE bd_applications;

-- ============================================
-- SAMPLE QUERIES FOR VIEWING DATA
-- ============================================

-- View all Campus Ambassador applications (latest first)
-- SELECT * FROM campus_ambassador_applications ORDER BY submitted_at DESC;

-- View all Business Development applications (latest first)
-- SELECT * FROM bd_applications ORDER BY submitted_at DESC;

-- Count total applications by type
-- SELECT 'Campus Ambassador' as type, COUNT(*) as total FROM campus_ambassador_applications
-- UNION ALL
-- SELECT 'Business Development' as type, COUNT(*) as total FROM bd_applications;

-- View applications from the last 7 days
-- SELECT * FROM campus_ambassador_applications WHERE submitted_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);
-- SELECT * FROM bd_applications WHERE submitted_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);

-- ============================================
-- NOTES
-- ============================================
-- 1. Make sure to run these queries on your MySQL database
-- 2. Ensure you have the proper database selected before running these scripts
-- 3. The tables use utf8mb4 charset for full Unicode support (including emojis)
-- 4. Indexes are created for frequently queried columns to improve performance
-- 5. The years_of_experience field allows decimals (e.g., 2.5 years)
-- 6. For the bd_applications table, years_of_experience is NULL for "Fresher" applications
-- ============================================
