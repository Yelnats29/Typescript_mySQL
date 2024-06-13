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

// Terminal
async function terminalMenu() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function question(query: string): Promise<string> {
        return new Promise(resolve => readline.question(query, resolve));
    }
    while (true) {
        console.log('1. Manage Companies')
        console.log('2. Manage Employees')
        console.log('3. Exit')
        const choice = await question('Enter the number of your choice: ');

        if (choice == '1') {
            await manageCompanies()
        } else if (choice == '2') {
            await manageEmployees()
        } else if (choice == '3') {
            break
        } else {
            console.log('Enter a valid option. ');
        }
    }

    readline.close();
}

// Manage Company Loop
async function manageCompanies() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function question(query: string): Promise<string> {
        return new Promise(resolve => readline.question(query, resolve));
    }

    while (true) {
        console.log('1. Create company')
        console.log('2. Read companies')
        console.log('3. Update companies')
        console.log('4. Delete companies')
        console.log('5. Go Back')
        const choice = await question('Select your option: ');

        if (choice == '1') {
            const name = await question('Enter the name of the company: ');
            const city = await question('Enter the city the company is located in: ');
            await createCompany(name, city);
        } else if (choice == '2') {
            const companies = await readCompany()
            console.log(companies)
        } else if (choice == '3') {
            const companyId = parseInt(await question('Enter the new company Id number: '), 10);
            const name = await question('Enter the new company name: ');
            const city = await question('Enter the company city name: ');
            await updateCompany(companyId, name, city)
        } else if (choice == '4') {
            const companyId = parseInt(await question('Enter the company Id number you wish to delete: '), 10)
            await deleteCompany(companyId)
        } else if (choice == '5') {
            break
        } else {
            console.log('Invalid option choice. Please make another selection: ')
        }
    }
    readline.close()
}


// Manage Employee Loop
async function manageEmployees() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function question(query: string): Promise<string> {
        return new Promise(resolve => readline.question(query, resolve));
    }

    while (true) {
        console.log('1. Create employee')
        console.log('2. Read employees')
        console.log('3. Update employees')
        console.log('4. Delete employees')
        console.log('5. Go Back')
        const choice = await question('Select your option: ');

        if (choice == '1') {
            const name = await question('Enter the name of the employee: ');
            const companyId = parseInt(await question("Enter the employee's company Id number: "), 10);
            await createEmployee(name, companyId);
        } else if (choice == '2') {
            const employees = await readEmployee()
            console.log(employees)
        } else if (choice == '3') {
            const employeeId = parseInt(await question('Enter the new employee Id number: '), 10);
            const name = await question('Enter the new employee name: ');
            const companyId = parseInt(await question("Enter the employee's new company Id number: "));
            await updateEmployee(employeeId, name, companyId)
        } else if (choice == '4') {
            const employeeId = parseInt(await question('Enter the employee Id number you wish to delete: '), 10)
            await deleteCompany(employeeId)
        } else if (choice == '5') {
            break
        } else {
            console.log('Invalid option choice. Please make another selection: ')
        }
    }
    readline.close()
}