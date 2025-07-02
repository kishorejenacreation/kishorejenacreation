import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, dob, age, gender, mobile, country } = body

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"KC Portfolio" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_RECEIVER || process.env.GMAIL_USER,
      subject: `🆕 New Signup: ${username}`,
      html: `
        <h2>New User Signup Notification</h2>
        <p><strong>Name:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>DOB:</strong> ${dob}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><em>Signup Time: ${new Date().toLocaleString()}</em></p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
  }
}
