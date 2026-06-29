import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

// Load variables from your .env.local file
dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());


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

  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #c6c6cd; padding: 20px; border-radius: 8px;">
      <h2 style="color: #755a20; border-bottom: 2px solid #fdd891; padding-bottom: 8px;">New Training Inquiry Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Work Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Selected Track:</strong> ${subject.toUpperCase()}</p>
      ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ''}
      ${teamSize ? `<p><strong>Team Size:</strong> ${teamSize}</p>` : ''}
      ${linkedinUrl ? `<p><strong>LinkedIn:</strong> <a href="${linkedinUrl}">${linkedinUrl}</a></p>` : ''}
      ${institutionName ? `<p><strong>Institution:</strong> ${institutionName}</p>` : ''}
      <h3 style="margin-bottom: 4px;">Message Requirements:</h3>
      <div style="background: #f2f4f6; padding: 12px; border-radius: 6px; font-style: italic;">${message}</div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'garimasri@gmail.com',
      subject: `New Training Inquiry: ${subject || 'Inquiry'}`,
      html: emailHtml,
    });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Inquiry sent successfully.' 
    });
  } catch (emailError) {
    console.error('Email failed to send (Check Gmail App Passwords):', emailError);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send inquiry email.' 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});