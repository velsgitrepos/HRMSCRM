require('dotenv').config();
const mysql = require('mysql2/promise');

async function setupDatabase() {
  const dbName = process.env.DB_NAME || 'talent_carpet';
  
  try {
    console.log(`Connecting to MySQL host: ${process.env.DB_HOST || '127.0.0.1'}, user: ${process.env.DB_USER || 'root'}...`);
    
    // Connect to MySQL server without database first
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
    });

    console.log(' Connected to MySQL Server!');

    // Create database if not exists
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    console.log(` Database "${dbName}" is ready and verified!`);

    await connection.end();
    console.log(' Setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(' MySQL Connection Error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
