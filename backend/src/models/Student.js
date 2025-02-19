const { pool } = require('../config/database');

class Student {
    static async findAll() {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'SELECT * FROM students ORDER BY created_at DESC'
            );
            return rows;
        } finally {
            if (conn) conn.release();
        }
    }

    static async findById(id) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'SELECT * FROM students WHERE student_id = ?',
                [id]
            );
            return rows[0];
        } finally {
            if (conn) conn.release();
        }
    }

    static async findByRfid(rfidNumber) {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(
                'SELECT * FROM students WHERE rfid_number = ?',
                [rfidNumber]
            );
            return rows[0];
        } finally {
            if (conn) conn.release();
        }
    }

    static async create(studentData) {
        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query(
                'INSERT INTO students (rfid_number, first_name, last_name, course, year_level, section) VALUES (?, ?, ?, ?, ?, ?)',
                [studentData.rfid_number, studentData.first_name, studentData.last_name, 
                 studentData.course, studentData.year_level, studentData.section]
            );
            return { id: result.insertId, ...studentData };
        } finally {
            if (conn) conn.release();
        }
    }

    static async update(id, studentData) {
        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query(
                'UPDATE students SET rfid_number = ?, first_name = ?, last_name = ?, course = ?, year_level = ?, section = ?, status = ? WHERE student_id = ?',
                [studentData.rfid_number, studentData.first_name, studentData.last_name, 
                 studentData.course, studentData.year_level, studentData.section, 
                 studentData.status, id]
            );
            return result.affectedRows > 0;
        } finally {
            if (conn) conn.release();
        }
    }

    static async delete(id) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.beginTransaction();

            try {
                // First, delete all check-ins for this student
                await conn.query(
                    'DELETE FROM check_ins WHERE student_id = ?',
                    [id]
                );

                // Then delete the student
                const result = await conn.query(
                    'DELETE FROM students WHERE student_id = ?',
                    [id]
                );

                await conn.commit();
                return result.affectedRows > 0;
            } catch (err) {
                await conn.rollback();
                throw err;
            }
        } finally {
            if (conn) conn.release();
        }
    }

    static async getCheckInCount(id) {
        let conn;
        try {
            conn = await pool.getConnection();
            const [result] = await conn.query(
                'SELECT COUNT(*) as count FROM check_ins WHERE student_id = ?',
                [id]
            );
            return Number(result.count);
        } finally {
            if (conn) conn.release();
        }
    }
}

module.exports = Student; 