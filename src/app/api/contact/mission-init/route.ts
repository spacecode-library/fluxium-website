import { NextRequest, NextResponse } from 'next/server'

// Create nodemailer transporter lazily
async function getTransporter() {
  try {
    const nodemailer = await import('nodemailer')
    
    // Use createTransport (not createTransporter)
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  } catch (error) {
    console.error('Error creating transporter:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      projectType,
      budget,
      painPoint,
      additionalInfo
    } = await request.json()

    // Validate required fields
    if (!name || !email || !projectType || !painPoint) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create email content
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #111111;">
        <!-- Header -->
        <div style="background: #ffffff; padding: 40px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
          <div style="margin-bottom: 24px;">
            <img src="https://res.cloudinary.com/dizbrnm2l/image/upload/v1752674061/Fluxium-logo_hb7vp8.png" alt="Fluxium" style="height: 60px; width: auto;" />
          </div>
          <h2 style="margin: 0; font-size: 18px; font-weight: 400; color: #000000; letter-spacing: 0.5px;">
            NEW PROJECT INQUIRY
          </h2>
        </div>

        <!-- Content -->
        <div style="padding: 48px 32px;">
          <!-- Contact Information -->
          <div style="margin-bottom: 40px;">
            <h3 style="color: #111111; font-size: 14px; font-weight: 600; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
              Contact Information
            </h3>
            <div style="border-left: 2px solid #e5e5e5; padding-left: 20px;">
              <p style="margin: 0 0 12px 0; color: #333333; font-size: 14px; line-height: 1.6;">
                <strong style="color: #111111;">Name:</strong><br/>${name}
              </p>
              <p style="margin: 0 0 12px 0; color: #333333; font-size: 14px; line-height: 1.6;">
                <strong style="color: #111111;">Email:</strong><br/>
                <a href="mailto:${email}" style="color: #000000; text-decoration: none;">${email}</a>
              </p>
              ${phone ? `<p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
                <strong style="color: #111111;">WhatsApp:</strong><br/>
                <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="color: #000000; text-decoration: none;">${phone}</a>
              </p>` : ''}
            </div>
          </div>

          <!-- Project Details -->
          <div style="margin-bottom: 40px;">
            <h3 style="color: #111111; font-size: 14px; font-weight: 600; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
              Project Details
            </h3>
            <div style="border-left: 2px solid #e5e5e5; padding-left: 20px;">
              <p style="margin: 0 0 12px 0; color: #333333; font-size: 14px; line-height: 1.6;">
                <strong style="color: #111111;">Project Type:</strong><br/>${projectType}
              </p>
              ${budget ? `<p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
                <strong style="color: #111111;">Budget Range:</strong><br/>${budget}
              </p>` : ''}
            </div>
          </div>

          <!-- Project Requirements -->
          <div style="margin-bottom: 40px;">
            <h3 style="color: #111111; font-size: 14px; font-weight: 600; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
              Project Requirements
            </h3>
            <div style="border-left: 2px solid #e5e5e5; padding-left: 20px;">
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 14px; line-height: 1.8;">
                ${painPoint}
              </p>
              
              ${additionalInfo ? `
                <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.8;">
                  <strong style="color: #111111;">Additional Information:</strong><br/>
                  ${additionalInfo}
                </p>
              ` : ''}
            </div>
          </div>

          <!-- Action Button -->
          <div style="text-align: center; margin-top: 48px;">
            <a href="mailto:${email}" style="display: inline-block; background: #000000; color: #ffffff; text-decoration: none; padding: 14px 32px; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase;">
              Reply to Inquiry
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8f8f8; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e5e5;">
          <p style="margin: 0; font-size: 12px; color: #666666;">
            This inquiry was submitted through fluxium.dev
          </p>
        </div>
      </div>
    `

    const emailText = `
FLUXIUM - NEW PROJECT INQUIRY

CONTACT INFORMATION
- Name: ${name}
- Email: ${email}
${phone ? `- WhatsApp: ${phone}` : ''}

PROJECT DETAILS
- Project Type: ${projectType}
${budget ? `- Budget Range: ${budget}` : ''}

PROJECT REQUIREMENTS
${painPoint}

${additionalInfo ? `Additional Information:\n${additionalInfo}` : ''}

---
This inquiry was submitted through fluxium.dev
    `

    // Send email to admin
    const adminMailOptions = {
      from: `"Fluxium" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'hello@fluxium.dev',
      subject: `New Project Inquiry: ${projectType} - ${name}`,
      html: emailHtml,
      text: emailText,
      replyTo: email
    }

    // Send confirmation email to user
    const userEmailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #111111;">
        <!-- Header -->
        <div style="background: #ffffff; padding: 40px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
          <div style="margin-bottom: 24px;">
            <img src="https://res.cloudinary.com/dizbrnm2l/image/upload/v1752674061/Fluxium-logo_hb7vp8.png" alt="Fluxium" style="height: 60px; width: auto;" />
          </div>
          <h2 style="margin: 0; font-size: 18px; font-weight: 400; color: #000000; letter-spacing: 0.5px;">
            THANK YOU FOR YOUR INQUIRY
          </h2>
        </div>

        <!-- Content -->
        <div style="padding: 48px 32px;">
          <div style="margin-bottom: 40px;">
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px 0; color: #111111;">
              Dear ${name},
            </p>
            <p style="line-height: 1.8; margin: 0 0 24px 0; color: #333333; font-size: 14px;">
              Thank you for reaching out to Fluxium. We have received your project inquiry and our team is reviewing your requirements. We will contact you within 24-48 hours to discuss your project in detail.
            </p>
          </div>

          <!-- Project Summary -->
          <div style="margin-bottom: 40px;">
            <h3 style="color: #111111; font-size: 14px; font-weight: 600; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
              Your Project Summary
            </h3>
            <div style="border-left: 2px solid #e5e5e5; padding-left: 20px;">
              <p style="margin: 0 0 12px 0; color: #333333; font-size: 14px; line-height: 1.6;">
                <strong style="color: #111111;">Project Type:</strong><br/>${projectType}
              </p>
              ${budget ? `<p style="margin: 0 0 12px 0; color: #333333; font-size: 14px; line-height: 1.6;">
                <strong style="color: #111111;">Budget Range:</strong><br/>${budget}
              </p>` : ''}
              <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.8;">
                <strong style="color: #111111;">Requirements:</strong><br/>${painPoint}
              </p>
            </div>
          </div>

          <!-- Next Steps -->
          <div style="margin-bottom: 40px;">
            <h3 style="color: #111111; font-size: 14px; font-weight: 600; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
              What Happens Next
            </h3>
            <div style="border-left: 2px solid #e5e5e5; padding-left: 20px;">
              <ol style="margin: 0; padding-left: 20px; color: #333333; font-size: 14px; line-height: 2;">
                <li>Our team will review your requirements</li>
                <li>We'll prepare a tailored proposal for your project</li>
                <li>We will reach out to schedule a consultation</li>
              </ol>
            </div>
          </div>

          <!-- Contact Info -->
          <div style="text-align: center; padding: 32px; background: #f8f8f8; border: 1px solid #e5e5e5;">
            <p style="margin: 0 0 16px 0; color: #111111; font-weight: 600; font-size: 14px;">Need immediate assistance?</p>
            <p style="margin: 0; font-size: 14px;">
              Email us at: <a href="mailto:${process.env.CONTACT_EMAIL || 'hello@fluxium.dev'}" style="color: #000000;">${process.env.CONTACT_EMAIL || 'hello@fluxium.dev'}</a>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8f8f8; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e5e5;">
          <p style="margin: 0; font-size: 12px; color: #666666;">
            © 2024 Fluxium. All rights reserved.
          </p>
        </div>
      </div>
    `

    const userEmailText = `
FLUXIUM - THANK YOU FOR YOUR INQUIRY

Dear ${name},

Thank you for reaching out to Fluxium. We have received your project inquiry and our team is reviewing your requirements. We will contact you within 24-48 hours to discuss your project in detail.

YOUR PROJECT SUMMARY
- Project Type: ${projectType}
${budget ? `- Budget Range: ${budget}` : ''}
- Requirements: ${painPoint}

WHAT HAPPENS NEXT
1. Our team will review your requirements
2. We'll prepare a tailored proposal for your project
3. A Fluxium specialist will reach out to schedule a consultation

Need immediate assistance?
Email us at: ${process.env.CONTACT_EMAIL || 'hello@fluxium.dev'}

---
© 2024 Fluxium. All rights reserved.
    `

    const userMailOptions = {
      from: `"Fluxium" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for your inquiry - ${projectType}`,
      html: userEmailHtml,
      text: userEmailText
    }

    // Send both emails
    const transporter = await getTransporter()
    const [adminInfo, userInfo] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ])

    return NextResponse.json(
      { message: 'Mission brief transmitted successfully', adminMessageId: adminInfo.messageId, userMessageId: userInfo.messageId },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}