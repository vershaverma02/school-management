import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'school_db',
});

export default db;