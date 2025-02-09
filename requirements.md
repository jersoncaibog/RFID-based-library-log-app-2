# RFID-Based Library Web App Requirements

## Core Features

### 1. Check-in System
- RFID card scanning functionality in "Dashboard" page
- Real-time student identification
- Success/failure feedback display
- Timestamp recording for each check-in
- Prevention of duplicate check-ins within short time periods

### 2. Leaderboard System
- Display top 10 students with most visits
- Auto-updating rankings
- Show visit count for each student

### 3. Visit Log
- Comprehensive list of all check-ins in a table in "Visit Log" page
- Filtering by date range
- Sorting by various fields (time, student name, etc.)
- Pagination for large datasets

### 4. Student Management
- Comprehensive list of all students data in a table in "Students" page
- Add new students with their RFID cards
- Edit student information
- Deactivate/reactivate student cards
- Bulk import/export student data
- Search and filter student records

## Technical Requirements

### Database Schema

#### Students Table
- student_id (Primary Key)
- rfid_number (Unique)
- first_name
- last_name
- grade_level
- section
- status (active/inactive)
- created_at
- updated_at

#### Check-ins Table
- check_in_id (Primary Key)
- student_id (Foreign Key)
- check_in_time
- check_in_date
- device_id

#### leaderboard Views
SELECT 
    s.student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS full_name,
    COUNT(c.check_in_id) AS visit_count
FROM students s
LEFT JOIN check_ins c ON s.student_id = c.student_id
GROUP BY s.student_id
ORDER BY visit_count DESC 

### API Endpoints
- use node.js, express, and mariadb for the backend

#### Student Management
- GET /api/students - List all students
- POST /api/students - Create new student
- PUT /api/students/:id - Update student
- DELETE /api/students/:id - Delete student
- GET /api/students/:id - Get single student

#### Check-in System
- POST /api/check-in - Record new check-in
- GET /api/check-in/verify/:rfid - Verify RFID card

#### Visit Log
- GET /api/visits - Get visit log
- GET /api/visits/export - Export visit data

#### Leaderboard
- GET /api/leaderboard - Get current rankings
- GET /api/leaderboard/:period - Get rankings by time period

## Non-Functional Requirements

### UI/UX Requirements
- Responsive design (mobile-friendly)
- Intuitive navigation (left sidebar)
- use html, css, and javascript for the frontend
- make the design minimalistic and modern similar to shadCDN's new york style
- Form Input validation like when an input field is empty, display error message on the form
