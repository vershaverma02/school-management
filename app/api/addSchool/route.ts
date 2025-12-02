import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import path from 'path';
import { promises as fs } from 'fs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const email_id = formData.get("email_id") as string;
    const imageFile = formData.get("image") as File;

    // ---------- SAVE IMAGE ----------
    const uploadDir = path.join(process.cwd(), "public/schoolImages");
    await fs.mkdir(uploadDir, { recursive: true });

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, imageBuffer);

    // ---------- INSERT INTO DATABASE ----------
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [result] = await connection.execute(
      `INSERT INTO schools (name, address, city, state, contact, email_id, image) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, email_id, `/schoolImages/${filename}`]
    );

    await connection.end();

    return NextResponse.json({ message: "School added successfully!" });
  } catch (error: any) {
    console.error("ADD SCHOOL ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
