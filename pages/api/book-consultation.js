import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    fullName, 
    email, 
    phone, 
    selectedDate, 
    selectedTime, 
    consultationType, 
    message 
  } = req.body;

  // Basic validation
  if (!fullName || !email || !phone || !selectedDate || !selectedTime) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Phone validation (basic)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
    return res.status(400).json({ message: 'Invalid phone number format' });
  }

  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Format date and time for display
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const formatTime = (timeString) => {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };

    const formattedDate = formatDate(selectedDate);
    const formattedTime = formatTime(selectedTime);

    // Business email content (for you)
    const businessEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #450f8c 0%, #f96714 100%); padding: 30px; border-radius: 20px 20px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎓 New Consultation Booking</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 20px 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #450f8c; margin-bottom: 20px;">Student Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Full Name:</strong>
            <span style="color: #6b7280; margin-left: 10px;">${fullName}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Email:</strong>
            <span style="color: #6b7280; margin-left: 10px;">${email}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Phone:</strong>
            <span style="color: #6b7280; margin-left: 10px;">${phone}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Consultation Type:</strong>
            <span style="color: #6b7280; margin-left: 10px;">${consultationType || 'General Consultation'}</span>
          </div>
          
          <h2 style="color: #450f8c; margin: 25px 0 15px 0;">📅 Appointment Details</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Date:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${formattedDate}</span>
            </div>
            
            <div style="margin-bottom: 10px;">
              <strong style="color: #374151;">Time:</strong>
              <span style="color: #6b7280; margin-left: 10px;">${formattedTime}</span>
            </div>
          </div>
          
          ${message ? `
            <h2 style="color: #450f8c; margin: 25px 0 15px 0;">💬 Additional Message</h2>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; border-left: 4px solid #f96714;">
              <p style="color: #374151; margin: 0; line-height: 1.6;">${message}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              📧 Booking received on ${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
            </p>
          </div>
        </div>
      </div>
    `;

    // Customer confirmation email content
    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
        <div style="background: linear-gradient(135deg, #450f8c 0%, #f96714 100%); padding: 30px; border-radius: 20px 20px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Consultation Request Received!</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 20px 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #450f8c; margin-bottom: 20px;">Hi ${fullName}!</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Thank you for requesting a consultation with us. We're excited to help you achieve your study abroad dreams! 
            Your consultation request has been received for:
          </p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin-bottom: 25px; text-align: center;">
            <div style="margin-bottom: 10px;">
              <strong style="color: #450f8c; font-size: 18px;">📅 ${formattedDate}</strong>
            </div>
            <div>
              <strong style="color: #450f8c; font-size: 18px;">⏰ ${formattedTime}</strong>
            </div>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #d97706; margin: 0 0 10px 0; font-size: 16px;">⏳ Next Steps - Please Wait for Confirmation</h3>
            <p style="color: #374151; margin: 0; line-height: 1.6;">
              <strong>Important:</strong> Your consultation is not yet confirmed. We will review your request and send you a confirmation email with the meeting link within 24 hours. Please wait for our confirmation before considering your appointment scheduled.
            </p>
          </div>
          
          <div style="background: #eff6ff; border: 1px solid #dbeafe; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">📋 What to Expect Once Confirmed:</h3>
            <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Personalized guidance on study destinations</li>
              <li>University selection and application process</li>
              <li>Scholarship opportunities and financial planning</li>
              <li>Visa requirements and documentation</li>
              <li>Career prospects and post-study work options</li>
            </ul>
          </div>
          
          <div style="background: #fef3e2; border: 1px solid #fed7aa; border-radius: 10px; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #ea580c; margin: 0 0 10px 0; font-size: 16px;">📝 Preparation Tips:</h3>
            <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Have your academic transcripts ready</li>
              <li>Think about your preferred study destinations</li>
              <li>Prepare questions about courses and universities</li>
              <li>Consider your budget and timeline</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280; margin-bottom: 15px;">Need to modify your request or have questions?</p>
            <p style="color: #6b7280; font-size: 14px;">
              📧 Email us or 📞 Call us for any assistance
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              We look forward to helping you with your study abroad journey! 🌍✈️<br>
              <strong>Please wait for our confirmation email before your consultation is officially scheduled.</strong>
            </p>
          </div>
        </div>
      </div>
    `;

    // Send business notification email
    const businessMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.BUSINESS_EMAIL || process.env.GMAIL_USER,
      subject: `🎓 New Consultation Booking - ${fullName}`,
      html: businessEmailContent,
      priority: 'high'
    };

    // Send customer confirmation email
    const customerMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: '🎉 Your Study Abroad Consultation is Confirmed!',
      html: customerEmailContent,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    // Success response
    res.status(200).json({ 
      message: 'Consultation booked successfully! Check your email for confirmation.',
      success: true,
      bookingDetails: {
        fullName,
        email,
        date: formattedDate,
        time: formattedTime,
        consultationType: consultationType || 'General Consultation'
      }
    });

  } catch (error) {
    console.error('Error sending emails:', error);
    
    // Send appropriate error response
    if (error.code === 'EAUTH') {
      res.status(500).json({ 
        message: 'Email authentication failed. Please try again later.',
        error: 'AUTH_ERROR'
      });
    } else if (error.code === 'ECONNECTION') {
      res.status(500).json({ 
        message: 'Unable to connect to email server. Please try again later.',
        error: 'CONNECTION_ERROR'
      });
    } else {
      res.status(500).json({ 
        message: 'Something went wrong. Please try again or contact support.',
        error: 'UNKNOWN_ERROR'
      });
    }
  }
}