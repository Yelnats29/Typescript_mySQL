import mysql from 'mysql2/promise';

// Create the connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'company_employee_db',
});

export default pool; 