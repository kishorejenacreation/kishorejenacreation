"use client"

// Email service to handle project requests
export const sendProjectRequest = async (formData: any) => {
  try {
    // Using EmailJS or similar service for client-side email sending
    const emailData = {
      to_email: "jenakishore2006@gmail.com",
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      budget: formData.budget,
      deadline: formData.deadline,
      message: formData.description,
      timestamp: new Date().toLocaleString(),
    }

    // Simulate email sending with EmailJS
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })

    if (response.ok) {
      return { success: true, message: "Project request sent successfully!" }
    } else {
      throw new Error("Failed to send email")
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, message: "Failed to send project request. Please try again." }
  }
}

// Fallback email service using mailto
export const sendEmailFallback = (formData: any) => {
  const subject = `New Project Request from ${formData.name}`
  const body = `
New Project Request Details:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service Required: ${formData.service}
Budget: ${formData.budget}
Deadline: ${formData.deadline}

Project Description:
${formData.description}

Submitted on: ${new Date().toLocaleString()}
  `

  const mailtoLink = `mailto:jenakishore2006@gmail.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`

  window.open(mailtoLink, "_blank")
  return { success: true, message: "Email client opened. Please send the email to complete your request." }
}
