import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Configuration Check
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.RECEIVER_EMAIL) {
    console.error('SERVER ERROR: Missing environment variables.');
    return res.status(500).json({ 
      error: 'Server is not configured for email. Please add SMTP_USER, SMTP_PASS, and RECEIVER_EMAIL to Vercel environment variables.' 
    });
  }

  // Configure Transporter (Explicit for better reliability on serverless)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.SMTP_USER || 'sekharparida2003@gmail.com',
      pass: process.env.SMTP_PASS || 'iptx bpbk uhkv dvtc', // Using your provided App Password
    },
  });

  const mailOptions = {
    from: `"Sekhar (Portfolio)" <${process.env.SMTP_USER || 'sekharparida2003@gmail.com'}>`,
    to: process.env.RECEIVER_EMAIL || 'sekharparida2003@gmail.com',
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #333;">New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
