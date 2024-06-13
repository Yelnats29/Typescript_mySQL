const mysql = require('mysql2/promise');

// Test the connection to MySQL database using node testConnection.js
(async () => {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'admin1',
        password: 'admin123',
        database: 'company_employee_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    try {
        const connection = await pool.getConnection();
        console.log("Connection successful!");
        connection.release();
    } catch (err) {
        console.error("Connection failed:", err);
    }
})();