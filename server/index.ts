import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || "getfreshtrax@gmail.com",
    pass: process.env.GMAIL_PASSWORD || "mpjq edee gidy lzdz",
  },
});

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies
  app.use(express.json());

  // API endpoint for lead notifications
  app.post("/api/send-lead-notification", async (req, res) => {
    try {
      const { name, email, businessType, phone, readyIn30, offer } = req.body;

      // Send email to admin
      await transporter.sendMail({
        from: process.env.GMAIL_USER || "getfreshtrax@gmail.com",
        to: "getfreshtrax@gmail.com",
        subject: `New Lead: ${name} - ${businessType}`,
        html: `
          <h2>New Lead Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Business Type:</strong> ${businessType}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Ready in 30 days:</strong> ${readyIn30 ? "Yes" : "No"}</p>
          <p><strong>Offer:</strong> ${offer}</p>
          <p><strong>Downloaded PDF:</strong> Yes</p>
        `,
      });

      res.json({ success: true, message: "Notification sent" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: "Failed to send notification" });
    }
  });

  // API endpoint for contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, company, inquiryType, message } = req.body;

      // Validate required fields
      if (!name || !email || !phone || !message) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }

      // Send email to admin
      await transporter.sendMail({
        from: process.env.GMAIL_USER || "getfreshtrax@gmail.com",
        to: "getfreshtrax@gmail.com",
        subject: `New Contact Form Submission: ${name} - ${inquiryType}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company/Venue:</strong> ${company || "Not provided"}</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p><em>Please respond within 1 business day.</em></p>
        `,
        replyTo: email,
      });

      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ success: false, error: "Failed to send message" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
