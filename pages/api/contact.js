
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, subject, message, country } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
      },
    });

    // Email content for you (the business owner)
    const businessEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #450f8c 0%, #f96714 100%); padding: 30px; border-radius: 20px 20px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 20px 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #450f8c; margin-bottom: 20px;">Contact Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Name:</strong>
            <span style="margin-left: 10px; color: #6b7280;">${name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Email:</strong>
            <span style="margin-left: 10px; color: #6b7280;">${email}</span>
          </div>
          
          ${phone ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Phone:</strong>
            <span style="margin-left: 10px; color: #6b7280;">${phone}</span>
          </div>` : ''}
          
          ${country ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Interested Country:</strong>
            <span style="margin-left: 10px; color: #6b7280;">${country}</span>
          </div>` : ''}
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Subject:</strong>
            <span style="margin-left: 10px; color: #6b7280;">${subject}</span>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151;">Message:</strong>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 10px; margin-top: 10px; color: #374151; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This email was sent from your website contact form at ${new Date().toLocaleString()}.
            </p>
          </div>
        </div>
      </div>
    `;

    // Auto-reply email content for the customer
    const autoReplyContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #450f8c 0%, #f96714 100%); padding: 30px; border-radius: 20px 20px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 20px 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Dear ${name},
          </p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to us! We have received your message about "<strong>${subject}</strong>" and appreciate your interest in studying abroad.
          </p>
          
          <div style="background: #f0f9ff; border-left: 4px solid #450f8c; padding: 20px; margin: 20px 0; border-radius: 0 10px 10px 0;">
            <h3 style="color: #450f8c; margin: 0 0 10px 0;">What happens next?</h3>
            <ul style="color: #374151; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Our expert counselors will review your inquiry</li>
              <li style="margin-bottom: 8px;">We'll respond within 24 hours during business days</li>
              <li style="margin-bottom: 8px;">You'll receive personalized guidance for your study abroad goals</li>
            </ul>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            In the meantime, feel free to explore our website for more information about study destinations and university options.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background: linear-gradient(135deg, #450f8c 0%, #f96714 100%); padding: 15px 30px; border-radius: 25px;">
              <a href="https://yourwebsite.com" style="color: white; text-decoration: none; font-weight: bold;">Visit Our Website</a>
            </div>
          </div>
          
          <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
              <strong>Contact Information:</strong>
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
              📧 Email: essploreabroad@gmail.com | 📞 Phone: +1 (216) 624 1878
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">
              🕒 Office Hours: Mon-Fri 9AM-6PM, Sat 10AM-4PM
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email to business owner
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Your business email
      subject: `New Contact Form: ${subject}`,
      html: businessEmailContent,
      replyTo: email, // Allow direct reply to the customer
    });

    // Send auto-reply to customer
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Thank you for contacting us - ${subject}`,
      html: autoReplyContent,
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}