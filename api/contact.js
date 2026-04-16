import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_Tgi1LkvK_6pe4oipMU9UhzbZ65txWshLf');

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
  if (!process.env.RESEND_API_KEY && !'re_Tgi1LkvK_6pe4oipMU9UhzbZ65txWshLf') {
    console.error('SERVER ERROR: Missing RESEND_API_KEY.');
    return res.status(500).json({ 
      error: 'Server is not configured for email. Please add RESEND_API_KEY to your Vercel environment variables.' 
    });
  }

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's default sender for unverified domains
      to: 'sekharparida2003@gmail.com', // Your verified destination email
      reply_to: email,
      subject: `Portfolio: ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: 0 auto; background-color: #fcfcfc;">
          <h2 style="color: #333; margin-bottom: 20px;">New Message from Portfolio</h2>
          <div style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</div>
          <div style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</div>
          <div style="margin-bottom: 20px;"><strong>Subject:</strong> ${subject}</div>
          <div style="border-top: 1px solid #eee; padding-top: 20px;">
            <strong>Message:</strong><br>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #444;">${message}</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully', id: data.id });
  } catch (error) {
    console.error('Resend Error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
