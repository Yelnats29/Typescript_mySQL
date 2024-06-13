import pool from "./db";

// Function to create tables
async function createTables() {
    const connection = await pool.getConnection();
    try {
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS 'companies' (
                id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                name varchar(30) NOT NULL,
                city varchar(30) NOT NULL
            )
       `);
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS 'employees' (
                id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                name varchar(30) NOT NULL,
                company_id int,
                FOREIGN KEY (company_id) REFERENCES companies(id)
            )
        `);
    } finally {
        connection.release()
    }
}
