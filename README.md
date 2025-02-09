# Library RFID Management System

A modern web-based RFID library management system that helps track student visits to the library using RFID cards. This system provides real-time check-ins, visit logging, and analytics.

## 📋 Table of Contents

- [Features](#features)
- [System Requirements](#system-requirements)
- [Technology Stack](#technology-stack)
- [Installation Guide](#installation-guide)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage Guide](#usage-guide)
- [Features Explanation](#features-explanation)
- [Troubleshooting](#troubleshooting)
- [Security Considerations](#security-considerations)

## ✨ Features

- **RFID Check-in System**

  - Real-time student check-in using RFID cards
  - Automatic duplicate check-in prevention (5-minute cooldown)
  - Visual feedback for successful/failed check-ins

- **Student Management**

  - Add, edit, and delete student records
  - Bulk student import/export
  - Advanced filtering and search capabilities
  - Pagination for large datasets

- **Visit Logging**

  - Comprehensive visit history
  - Date range filtering
  - Student-specific visit logs
  - Exportable reports

- **Analytics Dashboard**
  - Real-time visitor count
  - Top visitors leaderboard
  - Visit trends and statistics

## 💻 System Requirements

- Node.js (v14.0.0 or higher)
- MariaDB/MySQL (v10.0 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Minimum 2GB RAM
- 1GB free disk space

## 🛠 Technology Stack

- **Frontend:**

  - HTML5, CSS3, JavaScript (ES6+)
  - Font Awesome for icons
  - Modern responsive design

- **Backend:**
  - Node.js & Express.js
  - MariaDB/MySQL database
  - RESTful API architecture

## 📥 Installation Guide

### Prerequisites

1. Install Node.js:

   - Download from [nodejs.org](https://nodejs.org)
   - Verify installation: \`node --version\`

2. Install MariaDB:
   - Download from [mariadb.org](https://mariadb.org)
   - Remember your root password during installation

### Database Setup

1. Log into MariaDB:

   ```bash
   mysql -u root -p
   ```

2. Create the database:

   ```sql
   CREATE DATABASE randy_rfid_library;
   USE randy_rfid_library;
   ```

3. Import the schema:
   ```bash
   mysql -u root -p randy_rfid_library < backend/src/config/schema.sql
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=randy_rfid_library
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Open index.html in your web browser
2. Ensure backend server is running
3. System is ready to use

## 📖 Usage Guide

### Student Management

1. **Adding a Student:**

   - Click "Add Student" button
   - Fill in required information
   - Click "Save"

2. **Using RFID Check-in:**

   - Place cursor in RFID input field
   - Scan RFID card or enter number
   - System will automatically process check-in

3. **Viewing Visit Logs:**

   - Navigate to "Visit Log" tab
   - Use date filters to view specific periods
   - Filter by student if needed

4. **Managing Students:**
   - Use search bar to find students
   - Filter by course, year, or section
   - Click edit/delete icons for management

## 🔍 Features Explanation

### RFID Check-in Process

- System validates RFID number
- Checks for duplicate entries within 5 minutes
- Shows student information on successful check-in
- Updates leaderboard automatically

### Visit Logging

- Automatically records each check-in
- Stores date, time, and device information
- Provides filtering and sorting capabilities
- Supports data export

### Student Management

- Comprehensive student profiles
- RFID card assignment
- Course and section management
- Active/inactive status tracking

## ❗ Troubleshooting

### Common Issues

1. **Connection Errors:**

   - Verify backend server is running
   - Check database connection settings
   - Ensure correct port configuration

2. **RFID Not Reading:**

   - Check RFID reader connection
   - Verify card compatibility
   - Ensure proper card placement

3. **Database Issues:**
   - Verify MariaDB service is running
   - Check database credentials
   - Ensure schema is properly imported

## 🔒 Security Considerations

1. **Data Protection:**

   - Student information is securely stored
   - RFID numbers are validated
   - Database access is restricted

2. **Access Control:**

   - Backend API validation
   - Input sanitization
   - Error handling and logging

3. **Best Practices:**
   - Regular backups recommended
   - Periodic security updates
   - Strong password policies

## 🤝 Support

For additional support or questions:

1. Check the troubleshooting guide
2. Review error logs
3. Contact system administrator

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Font Awesome for icons
- MariaDB community
- Node.js community
- Express.js team