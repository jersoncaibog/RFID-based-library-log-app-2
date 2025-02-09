-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS randy_rfid_library;
USE randy_rfid_library;
-- Create students table
CREATE TABLE IF NOT EXISTS students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    rfid_number VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    course VARCHAR(50),
    year_level VARCHAR(50),
    section VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Create check_ins table
CREATE TABLE IF NOT EXISTS check_ins (
    check_in_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    check_in_time TIME NOT NULL,
    check_in_date DATE NOT NULL,
    device_id VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);
-- Create view for leaderboard
CREATE OR REPLACE VIEW leaderboard AS
SELECT s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS full_name,
    s.course,
    s.year_level,
    s.section,
    COUNT(c.check_in_id) AS visit_count
FROM students s
    LEFT JOIN check_ins c ON s.student_id = c.student_id
WHERE s.status = 'active'
GROUP BY s.student_id
ORDER BY visit_count DESC;


