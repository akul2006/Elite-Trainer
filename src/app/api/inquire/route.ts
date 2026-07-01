import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, companyName, teamSize, linkedinUrl, institutionName, customSkills } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Construct the HTML email structure
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #c6c6cd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #755a20; border-bottom: 2px solid #fdd891; padding-bottom: 8px;">New Training Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Work Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Selected Track:</strong> ${subject ? subject.toUpperCase() : 'N/A'}</p>
        ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ''}
        ${teamSize ? `<p><strong>Team Size:</strong> ${teamSize}</p>` : ''}
        ${linkedinUrl ? `<p><strong>LinkedIn:</strong> <a href="${linkedinUrl}">${linkedinUrl}</a></p>` : ''}
        ${institutionName ? `<p><strong>Institution:</strong> ${institutionName}</p>` : ''}
        ${customSkills && customSkills.length > 0 ? `
          <div style="margin-top: 12px; background: #fffcf2; padding: 12px; border-radius: 6px; border: 1px solid #fdd891;">
            <p style="margin-top: 0; margin-bottom: 8px;"><strong>Requested Custom Skills:</strong></p>
            <ul style="margin: 0; padding-left: 20px; color: #4a4a4a;">
              ${customSkills.map((skill: string) => `<li style="margin-bottom: 4px;">${skill}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        <h3 style="margin-bottom: 4px;">Message Requirements:</h3>
        <div style="background: #f2f4f6; padding: 12px; border-radius: 6px; font-style: italic;">${message}</div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'garimasri@gmail.com',
      subject: `New Training Inquiry: ${subject || 'Inquiry'}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: 'Inquiry sent successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Email failed to send:', error);
    return NextResponse.json({ success: false, message: 'Failed to send inquiry email.' }, { status: 500 });
  }
}