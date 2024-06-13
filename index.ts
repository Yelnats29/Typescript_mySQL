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


// Company CRUD Functions
async function createCompany(name: string, city: string) {
    const connection = await pool.getConnection();
    try {
        await connection.execute('INSERT INTO companies (name, city) VALUES (?, ?)', [name, city]);
    } finally {
        connection.release
    }
}


async function readCompany() {
    const connection = await pool.getConnection();
    try {
        const [read] = await connection.execute('SELECT * FROM companies')
        return read;
    } finally {
        connection.release
    }
}


async function updateCompany(companyId: number, name: string, city: string) {
    const connection = await pool.getConnection();
    try {
        await connection.execute('UPDATE companies SET name = ?, city = ? WHERE id = ?', [name, city, companyId])
    } finally {
        connection.release
    }
}


async function deleteCompany(companyId: number) {
    const connection = await pool.getConnection();
    try {
        await connection.execute('DELETE FROM companies WHERE id = ?', [companyId,])
    } finally {
        connection.release
    }
}



// Employee CRUD Functions
async function createEmployee(name: string, companyId: number) {
    const connection = await pool.getConnection();
    try {
        await connection.execute('INSERT INTO employees (name, company_id) VALUES (?, ?)', [name, companyId]);
    } finally {
        connection.release
    }
}


async function readEmployee() {
    const connection = await pool.getConnection();
    try {
        const [read] = await connection.execute('SELECT * FROM employees')
        return read;
    } finally {
        connection.release
    }
}


async function updateEmployee(employeeId: number, name: string, companyId: number) {
    const connection = await pool.getConnection();
    try {
        await connection.execute('UPDATE employees SET name = ?, company_id = ? WHERE id = ?', [name, companyId, employeeId])
    } finally {
        connection.release
    }
}


async function deleteEmployee(employeeId: number) {
    const connection = await pool.getConnection();
    try {
        await connection.execute('DELETE FROM employees WHERE id = ?', [employeeId,])
    } finally {
        connection.release
    }
}

