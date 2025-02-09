const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

// Test database connection
async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection failed:', err);
    } finally {
        if (conn) conn.release();
    }
}

module.exports = {
    pool,
    testConnection
};
