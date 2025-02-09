const { pool } = require('../config/database');

class CheckIn {
    static async create(checkInData) {
        let conn;
        try {
            conn = await pool.getConnection();
            const result = await conn.query(
                'INSERT INTO check_ins (student_id, check_in_time, check_in_date, device_id) VALUES (?, ?, ?, ?)',
                [checkInData.student_id, checkInData.check_in_time, checkInData.check_in_date, checkInData.device_id]
            );
            // Convert BigInt to Number
            const insertId = Number(result.insertId);
            return { 
                check_in_id: insertId,
                ...checkInData,
                student_id: Number(checkInData.student_id)
            };
        } finally {
            if (conn) conn.release();
        }
    }

    static async getVisitLog(filters = {}) {
        let conn;
        try {
            conn = await pool.getConnection();
            let baseQuery = `
                FROM check_ins c
                JOIN students s ON c.student_id = s.student_id
                WHERE 1=1
            `;
            const params = [];

            if (filters.startDate) {
                baseQuery += ' AND c.check_in_date >= ?';
                params.push(filters.startDate);
            }
            if (filters.endDate) {
                baseQuery += ' AND c.check_in_date <= ?';
                params.push(filters.endDate);
            }
            if (filters.studentId) {
                baseQuery += ' AND s.student_id = ?';
                params.push(filters.studentId);
            }

            // Get total count
            const countQuery = `SELECT COUNT(*) as total ${baseQuery}`;
            const [totalResult] = await conn.query(countQuery, params);
            const total = totalResult.total;

            // Get paginated data
            let dataQuery = `
                SELECT 
                    c.check_in_id,
                    c.check_in_time,
                    c.check_in_date,
                    c.device_id,
                    s.student_id,
                    s.first_name,
                    s.last_name,
                    s.course,
                    s.year_level,
                    s.section
                ${baseQuery}
                ORDER BY c.check_in_date DESC, c.check_in_time DESC
            `;

            if (filters.limit) {
                dataQuery += ' LIMIT ?';
                params.push(parseInt(filters.limit));
            }
            if (filters.offset) {
                dataQuery += ' OFFSET ?';
                params.push(parseInt(filters.offset));
            }

            const rows = await conn.query(dataQuery, params);
            return { data: rows, total };
        } finally {
            if (conn) conn.release();
        }
    }

    static async getLeaderboard(period = null) {
        let conn;
        try {
            conn = await pool.getConnection();
            let query = `
                SELECT 
                    s.student_id,
                    CONCAT(s.first_name, ' ', s.last_name) AS full_name,
                    s.course,
                    s.year_level,
                    s.section,
                    CAST(COUNT(c.check_in_id) AS SIGNED) AS visit_count
                FROM students s
                LEFT JOIN check_ins c ON s.student_id = c.student_id
            `;

            const params = [];
            if (period) {
                query += ' WHERE c.check_in_date >= ?';
                params.push(period);
            }

            query += `
                GROUP BY s.student_id
                ORDER BY visit_count DESC
                LIMIT 10
            `;

            const rows = await conn.query(query, params);
            // Convert BigInt to Number for each row
            return rows.map(row => ({
                ...row,
                visit_count: Number(row.visit_count)
            }));
        } finally {
            if (conn) conn.release();
        }
    }

    static async hasRecentCheckIn(studentId, minutesThreshold = 5) {
        let conn;
        try {
            conn = await pool.getConnection();
            const query = `
                SELECT COUNT(*) as count
                FROM check_ins
                WHERE student_id = ?
                AND check_in_date = CURDATE()
                AND check_in_time >= TIME(DATE_SUB(NOW(), INTERVAL ? MINUTE))
            `;
            const result = await conn.query(query, [studentId, minutesThreshold]);
            return result[0].count > 0;
        } finally {
            if (conn) conn.release();
        }
    }
}

module.exports = CheckIn; 