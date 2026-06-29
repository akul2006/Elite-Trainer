import express from 'express';
import pg from 'pg';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load variables from your .env.local file
dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json());

// Initialize PostgreSQL Pool using your .env.local credentials
const { Pool } = pg;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Initialize Nodemailer with your system email router
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/inquire', async (req, res) => {
  const { name, email, subject, message, companyName, teamSize, linkedinUrl, institutionName } = req.body;

  try {
    // 1. Save to your local PostgreSQL Database
    const queryText = `
      INSERT INTO inquiries (name, email, subject, message, company_name, team_size, linkedin_url, institution_name, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING id;
    `;
    const values = [
      name, 
      email, 
      subject, 
      message, 
      companyName || null, 
      teamSize ? parseInt(teamSize, 10) : null, 
      linkedinUrl || null, 
      institutionName || null
    ];
    await pool.query(queryText, values);

    // 2. Format HTML email notification
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #c6c6cd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #755a20; border-bottom: 2px solid #fdd891; padding-bottom: 8px;">New Training Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Work Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Selected Track:</strong> ${subject.toUpperCase()}</p>
        ${companyName ? `<p><strong>Company:</strong> ${companyName} (Size: ${teamSize})</p>` : ''}
        ${linkedinUrl ? `<p><strong>LinkedIn:</strong> <a href="${linkedinUrl}">${linkedinUrl}</a></p>` : ''}
        ${institutionName ? `<p><strong>Institution:</strong> ${institutionName}</p>` : ''}
        <h3 style="margin-bottom: 4px;">Message Requirements:</h3>
        <div style="background: #f2f4f6; padding: 12px; border-radius: 6px; font-style: italic;">${message}</div>
      </div>
    `;

    // 3. Send the notification mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Training Inquiry: ${subject || 'Inquiry'}`,
      html: emailHtml,
    });

    // Ensure this JSON structure is sent back exactly to trigger the frontend success state
    return res.status(200).json({ 
      success: true, 
      message: 'Inquiry saved and emailed successfully.' 
    });

  } catch (error) {
    console.error('Backend transaction process failed:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server processing error.' 
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});