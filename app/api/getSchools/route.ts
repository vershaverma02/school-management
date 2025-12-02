// app/api/getSchools/route.ts
import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'your_database'
    });
    

const [rows] = await db.query(
  "SELECT id, name, address, city, state, contact, email_id, image FROM schools"
);
    await db.end();
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
